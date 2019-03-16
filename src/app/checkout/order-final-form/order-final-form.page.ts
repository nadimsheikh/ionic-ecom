import { Component, OnInit } from '@angular/core';
import { CartService } from '../../provider/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormService } from '../../provider/form.service';

@Component({
  selector: 'app-order-final-form',
  templateUrl: './order-final-form.page.html',
  styleUrls: ['./order-final-form.page.scss'],
})
export class OrderFinalFormPage implements OnInit {


  public message;
  public messageTitle;
  public categoryId;
  public products: any[] = [];
  public types;
  public filter: any[] = [];
  public searchText;
  public length;
  public start;


  public data;
  public comment;

  public form: FormGroup;

  public formErrors = {
    comment: '',
  };


  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private route: Router,
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
    this.createForm();
    this.getProducts();
  }

  public createForm() {
    this.form = this.formBuilder.group({
      comment: [this.comment, Validators.compose([Validators.required])],
    });

    this.form.valueChanges.subscribe(data => {
      this.formErrors = this.formService.validateForm(
        this.form,
        this.formErrors,
        true
      );
    });
  }

  public onSubmit() {
    // mark all fields as touched
    this.formService.markFormGroupTouched(this.form);
    if (this.form.valid) {
      this.cartService.saveOrder(this.form.value).subscribe(
        response => {
          if (!response.status) {
            this.message = response.message;
            this.messageTitle = 'Warning!';
            if (response.result) {
              response.result.forEach(element => {
                this.formErrors[`${element.id}`] = element.text;
              });
            }
          } else {
            this.message = response.message;
            this.messageTitle = 'Sucess!';
            this.form.reset();
          }
          this.presentToast(this.message);
        },
        err => {
          console.error(err);
        }
      );

      this.presentToast(this.message);
      this.route.navigateByUrl('/home');
    } else {
      this.formErrors = this.formService.validateForm(
        this.form,
        this.formErrors,
        false
      );
    }
  }

  doRefresh(event) {
    this.products = [];
    this.getProducts();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  removeProduct(product: any) {
    this.cartService.delete(product.id).subscribe(
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
    this.cartService.list(this.filter).subscribe(
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
              price: element.price,
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
