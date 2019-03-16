import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../provider/account/order/order.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  public message;
  public messageTitle;
  public categoryId;
  public orders: any[] = [];
  public types;
  public filter: any[] = [];
  public searchText;
  public length;
  public start;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orders = [];
    this.getOrders();
  }

  doRefresh(event) {
    this.orders = [];
    this.getOrders();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  searchProduct(event) {
    this.searchText = event.detail.value;
    this.filter['search'] = this.searchText;
    this.filter['start'] = 0;
    this.filter['length'] = 10;
    this.orders = [];
    this.getOrders();
  }

  getOrders() {
    this.orderService.list(this.filter).subscribe(
      response => {
        // console.log(response);
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';

          response.data.forEach(element => {
            this.orders.push({
              id: element.id,
              order_type: element.order_type,
              name: element.name,
              email: element.email,
              contact: element.contact,
              country: element.country,
              zone: element.zone,
              city: element.city,
              postcode: element.postcode,
              address: element.address,
              comment: element.comment,
              total: element.total,
              url: '/order-detail/' + element.id,
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
