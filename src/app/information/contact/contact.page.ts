import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { ContactService } from '../../provider/infoModule/contact/contact.service';
import { FormService } from '../../provider/form.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  public message;
  public messageTitle;
  public name;
  public email;
  public contact;
  public text;

  public form: FormGroup;
  public formErrors = {
    name: '',
    email: '',
    contact: '',
    text: '',
  };

  constructor(
    private masterService: ContactService,
    private formService: FormService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
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
