import { Component } from '@angular/core';
import { TypeService } from '../provider/productModule/type/type.service';
import { ProductService } from '../provider/productModule/product/product.service';
import { SettingService } from '../provider/setting/setting.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public message;
  public messageTitle;
  public types;
  public filter: any[] = [];
  public products: any[] = [];
  public banners: any[] = [];

  slideOpts = {
    effect: 'flip'
  };

  constructor(
    private route: Router,
    private typeService: TypeService,
    private productService: ProductService,
    private settingService: SettingService
  ) {
    this.getBanners();
    this.getTypes();
    this.getProducts();
  }

  goToSearch() {
    this.route.navigateByUrl('/product-list');
  }
  goToCart() {
    this.route.navigateByUrl('/cart');
  }

  typeChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  getBanners() {
    this.settingService.banner(1).subscribe(
      response => {
        // console.log(response);
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          this.banners = response.data.images;
        }
      },
      err => {
        console.error(err);
      }
    );
  }
  getTypes() {
    this.typeService.list(this.filter).subscribe(
      response => {
        // console.log(response);
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          this.types = response.data;
        }
      },
      err => {
        console.error(err);
      }
    );
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
