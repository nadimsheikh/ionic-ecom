import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from '../../provider/infoModule/contact/contact.service';
import { FormService } from '../../provider/form.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  message;
  messageTitle;
  name;
  email;
  contact;
  text;

  form: FormGroup;

  formErrors = {
    name: '',
    email: '',
    contact: '',
    text: '',
  };

  constructor(
    private masterService: ContactService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    public toastController: ToastController
  ) {
    this.createForm();
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
  }

  public createForm() {
    this.form = this.formBuilder.group({
      name: [this.name, Validators.compose([Validators.required])],
      email: [this.email, Validators.compose([Validators.required])],
      contact: [this.contact, Validators.compose([Validators.required])],
      text: [this.text, Validators.compose([Validators.required])],
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
      this.masterService.save(this.form.value).subscribe(
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
    } else {
      this.formErrors = this.formService.validateForm(
        this.form,
        this.formErrors,
        false
      );
    }
  }


}
