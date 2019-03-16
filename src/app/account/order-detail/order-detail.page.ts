import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../provider/account/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  public message;
  public messageTitle;
  public id;
  public categoryId;
  public data: any;
  public backUrl;
  section: String = 'info';

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.backUrl = '/order-list';
    this.getData();
  }

  doRefresh(event) {
    this.getData();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  getData() {
    this.orderService.detail(this.id).subscribe(
      response => {
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
