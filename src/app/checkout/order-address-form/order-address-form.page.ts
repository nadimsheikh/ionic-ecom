import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from '../../provider/infoModule/contact/contact.service';
import { FormService } from '../../provider/form.service';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../provider/account/user/user.service';
import { Router } from '@angular/router';
import { SettingService } from '../../provider/setting/setting.service';

@Component({
  selector: 'app-order-address-form',
  templateUrl: './order-address-form.page.html',
  styleUrls: ['./order-address-form.page.scss'],
})
export class OrderAddressFormPage implements OnInit {


  public data;
  public message;
  public messageTitle;
  public country_id;
  public zone_id;
  public city_id;
  public postcode;
  public address;

  public countries;
  public zones;
  public cities;

  public form: FormGroup;

  public formErrors = {
    country_id: '',
    zone_id: '',
    city_id: '',
    postcode: '',
    address: '',
  };


  constructor(
    private masterService: ContactService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private route: Router,
    private userService: UserService,
    private settingService: SettingService,
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
    this.getCountries();
    this.getData();
    this.createForm();
  }

  public createForm() {
    this.form = this.formBuilder.group({
      country_id: [this.country_id, Validators.compose([Validators.required])],
      zone_id: [this.zone_id, Validators.compose([Validators.required])],
      city_id: [this.city_id, Validators.compose([Validators.required])],
      postcode: [this.postcode, Validators.compose([Validators.required])],
      address: [this.address, Validators.compose([Validators.required])],
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

      localStorage.setItem('order-address', JSON.stringify(this.form.value));
      if (localStorage.getItem('order-address')) {
        this.message = 'order address saved';
      }
      this.presentToast(this.message);
      this.route.navigateByUrl('/order-final-form');
    } else {
      this.formErrors = this.formService.validateForm(
        this.form,
        this.formErrors,
        false
      );
    }
  }

  getCountries() {
    this.settingService.countries({}).subscribe(
      response => {
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          this.countries = response.data;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  setCountry(data: any) {
    this.country_id = data.detail.value;
    this.getZones();
  }

  getZones() {
    this.settingService.zones({
      country_id: this.country_id
    }).subscribe(
      response => {
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          this.zones = response.data;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  setZone(data: any) {
    this.zone_id = data.detail.value;
    this.getCities();
  }

  getCities() {
    this.settingService.cities({
      country_id: this.country_id,
      zone_id: this.zone_id
    }).subscribe(
      response => {
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          this.cities = response.data;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  setCity(data: any) {
    this.city_id = data.detail.value;
  }


  getData() {
    if (localStorage.getItem('order-address')) {
      this.data = JSON.parse(localStorage.getItem('order-address'));
      this.country_id = this.data.country_id;
      this.zone_id = this.data.zone_id;
      this.city_id = this.data.city_id;
      this.postcode = this.data.postcode;
      this.address = this.data.address;

      this.getZones();
      this.getCities();
    }
  }



}
