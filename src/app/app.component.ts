import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TypeService } from './provider/productModule/type/type.service';
import { InformationService } from './provider/infoModule/information/information.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Account',
      url: '/list',
      icon: 'person'
    },
    {
      title: 'Notifications',
      url: '/list',
      icon: 'notifications'
    },
    {
      title: 'My Cart',
      url: '/list',
      icon: 'cart'
    },
    {
      title: 'My Wishlist',
      url: '/list',
      icon: 'heart'
    },
    {
      title: 'My Orders',
      url: '/list',
      icon: 'basket'
    },
    {
      title: 'Contact',
      url: '/list',
      icon: 'contact'
    },
    {
      title: 'Settings',
      url: '/list',
      icon: 'settings'
    },
  ];

  public informations: any[] = [];
  public types: any[] = [];
  public categories: any[] = [];

  public message;
  public messageTitle;
  public filter: any[] = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private typeService: TypeService,
    private infoService: InformationService,
  ) {
    this.initializeApp();
    this.getTypes();
    this.getInfo();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getTypes() {
    this.typeService.list(this.filter).subscribe(
      response => {
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          response.data.forEach(element => {
            this.types.push(
              {
                title: element.name,
                image: element.image,
                url: ''
              }
            );
          });
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  getInfo() {
    this.infoService.list(this.filter).subscribe(
      response => {
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          response.data.forEach(element => {
            this.informations.push(
              {
                title: element.name,
                image: element.image,
                url: ''
              }
            );
          });
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
