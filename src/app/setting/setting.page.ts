import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingService } from '../provider/setting/setting.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public message;
  public messageTitle;
  public currencies;
  public currency_id;

  constructor(
    private router: Router,
    private settingService: SettingService,
  ) { }

  ngOnInit() {
    this.currency_id = localStorage.getItem('currency_id');
    this.getCurrency();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  getCurrency() {
    this.settingService.currencies({}).subscribe(
      response => {
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          this.currencies = response.data;
        }
      },
      err => {
        console.error(err);
      }
    );
  }


  setCurrency(data: any) {
    localStorage.setItem('currency_id', data.detail.value);
  }
}
