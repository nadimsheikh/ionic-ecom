import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../provider/account/user/user.service';
import { FormService } from '../../provider/form.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  message;
  messageTitle;
  username;
  password;

  form: FormGroup;

  formErrors = {
    username: '',
    password: ''
  };

  constructor(
    private masterService: UserService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router
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
    this.createForm();

    if (localStorage.getItem('user')) {
      this.router.navigate(['account']);
    }
  }

  public createForm() {
    this.form = this.formBuilder.group({
      username: [this.username, Validators.compose([Validators.required])],
      password: [this.password, Validators.compose([Validators.required])]
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
      this.masterService.login(this.form.value).subscribe(
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
            localStorage.setItem('user', JSON.stringify(response.data));
            this.form.reset();
          }
          this.presentToast(this.message);
          this.router.navigate(['account']);
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
