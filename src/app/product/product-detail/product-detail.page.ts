import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../provider/productModule/product/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  public message;
  public messageTitle;
  public id;
  public categoryId;
  public data: any;
  public backUrl;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.categoryId = localStorage.getItem('categoryId');
    this.backUrl = '/product-list/' + this.categoryId;
    this.getData();
  }

  doRefresh(event) {
    this.getData();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  getData() {
    this.productService.detail(this.id).subscribe(
      response => {
        // console.log(response);
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          this.data = response.data;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

}
