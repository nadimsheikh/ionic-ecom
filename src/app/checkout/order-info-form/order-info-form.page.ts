import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from '../../provider/infoModule/contact/contact.service';
import { FormService } from '../../provider/form.service';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../provider/account/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-info-form',
  templateUrl: './order-info-form.page.html',
  styleUrls: ['./order-info-form.page.scss'],
})
export class OrderInfoFormPage implements OnInit {

  public data;
  public message;
  public messageTitle;
  public name;
  public email;
  public contact;

  public form: FormGroup;

  public formErrors = {
    name: '',
    email: '',
    contact: '',
  };


  constructor(
    private masterService: ContactService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private route: Router,
    private userService: UserService
  ) {

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

  ngOnInit() {
    this.getData();
    if (this.data) {
      this.name = this.data.name;
      this.email = this.data.email;
      this.contact = this.data.contact;
    }
    this.createForm();
  }

  public createForm() {
    this.form = this.formBuilder.group({
      name: [this.name, Validators.compose([Validators.required])],
      email: [this.email, Validators.compose([Validators.required])],
      contact: [this.contact, Validators.compose([Validators.required])]
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
      console.log(this.form.value);

      localStorage.setItem('order-info', JSON.stringify(this.form.value));
      if (localStorage.getItem('order-info')) {
        this.message = 'order info saved';
      }
      this.presentToast(this.message);
      this.route.navigateByUrl('/order-address-form');
    } else {
      this.formErrors = this.formService.validateForm(
        this.form,
        this.formErrors,
        false
      );
    }
  }

  getData(): any {
    this.userService.getStorageData().subscribe(
      (response) => {
        this.data = response;
      }
    );
  }

}
