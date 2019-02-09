import { Component } from '@angular/core';
import { TypeService } from "../provider/productModule/type/type.service";
import { ProductService } from "../provider/productModule/product/product.service";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public message;
  public messageTitle;
  public products;
  public types;
  public filter:any[]=[];

  constructor(
    private typeService: TypeService,
    private productService: ProductService
  ) {
    this.getTypes();
    this.getProducts();
  }

  getTypes() {
    this.typeService.list(this.filter).subscribe(
      response => {
        // console.log(response);
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = "Warning!";
        } else {
          this.message = response.message;
          this.messageTitle = "Sucess!";
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
          this.messageTitle = "Warning!";
        } else {
          this.message = response.message;
          this.messageTitle = "Sucess!";
          this.products = response.data;
        }
      },
      err => {
        console.error(err);
      }
    );
  }


}
