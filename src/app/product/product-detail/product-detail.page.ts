import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../provider/productModule/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../provider/account/wishlist/wishlist.service';
import { CartService } from '../../provider/cart/cart.service';
import { ToastController } from '@ionic/angular';

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
  section: String = 'info';

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.categoryId = localStorage.getItem('filterCategoryId');
    this.backUrl = '/product-list/' + this.categoryId;
    this.getData();
  }


  segmentChanged(event) {
    this.section = event.detail.value;
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

  addWishlist() {
    this.wishlistService.add(this.id).subscribe(
      response => {
        // console.log(response);
        if (!response.status) {
          this.message = response.message;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
        }
        this.presentToast(this.message);
      },
      err => {
        console.error(err);
      }
    );
  }
  addCart() {
    this.cartService.add({
      product_id: this.id,
      quantity: 1,
    }).subscribe(
      response => {
        // console.log(response);
        if (!response.status) {
          this.message = response.message;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
        }
        this.presentToast(this.message);
      },
      err => {
        console.error(err);
      }
    );
  }

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

}
