import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../provider/productModule/product/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  public message;
  public messageTitle;
  public categoryId;
  public products: any[] = [];
  public types;
  public filter: any[] = [];
  public searchText;
  public length;
  public start;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.products = [];
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');
    localStorage.setItem('filterCategoryId', this.categoryId);
    this.filter['categoryId'] = this.categoryId;
    this.getProducts();
  }

  doRefresh(event) {
    this.products = [];
    this.getProducts();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  searchProduct(event) {
    this.searchText = event.detail.value;
    this.filter['search'] = this.searchText;
    this.filter['start'] = 0;
    this.filter['length'] = 10;
    this.products = [];
    this.getProducts();
  }

  getProducts() {
    this.productService.list(this.filter).subscribe(
      response => {
        // console.log(response);
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';

          response.data.forEach(element => {
            this.products.push({
              name: element.name,
              price: element.price,
              image_thumb: element.image_thumb,
              url: '/product-detail/' + element.id,
            });
          });

        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
