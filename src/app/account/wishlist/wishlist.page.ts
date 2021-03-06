import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../provider/account/wishlist/wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

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
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
  ) { }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      duration: 2000,
      closeButtonText: 'Done'
    });
    toast.present();
  }

  ngOnInit() {
    this.products = [];

    this.getProducts();
  }

  doRefresh(event) {
    this.products = [];
    this.getProducts();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  removeProduct(product: any) {
    this.wishlistService.delete(product.id).subscribe(
      response => {
        // console.log(response);
        if (!response.status) {
          this.message = response.message;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
        }

        this.products = [];
        this.getProducts();
        this.presentToast(this.message);
      },
      err => {
        console.error(err);
      }
    );
  }

  getProducts() {
    this.wishlistService.list(this.filter).subscribe(
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
              id: element.id,
              product_name: element.product_name,
              updated_at: element.updated_at,
              product_image: element.product_image,
              url: '/product-detail/' + element.product_id,
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
