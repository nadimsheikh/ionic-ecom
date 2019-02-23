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
  public showInfo: Boolean = false;
  public showInfoMenuIcon = 'arrow-dropright';
  public types: any[] = [];
  public showType: Boolean = false;
  public showTypeMenuIcon = 'arrow-dropright';
  public categories: any[] = [];
  public accountMenu: any[] = [];

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
    this.getAccountMenu();
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
    this.typeService.menu(this.filter).subscribe(
      response => {
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          response.data.forEach(element => {


            this.categories = [];

            if (element.categories) {
              element.categories.forEach(category => {
                this.categories.push({
                  title: category.name,
                  image: category.image,
                  url: '/product-list/' + category.id,
                });
              });
            }

            this.types.push({
              id: element.id,
              title: element.name,
              image: element.image,
              url: '',
              categories: this.categories,
              showIcon: 'arrow-dropright',
              show: false
            });
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
                url: '/information/' + element.id
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

  getAccountMenu() {
    this.accountMenu.push({
      title: 'My Account',
      url: '/list',
      icon: 'person'
    });
    this.accountMenu.push({
      title: 'My Wishlist',
      url: '/list',
      icon: 'person'
    });
    this.accountMenu.push({
      title: 'My Orders',
      url: '/list',
      icon: 'basket'
    });
  }

  showInfoMenu() {
    if (this.showInfo === false) {
      this.showInfo = true;
      this.showInfoMenuIcon = 'arrow-dropdown';
    } else {
      this.showInfo = false;
      this.showInfoMenuIcon = 'arrow-dropright';
    }
  }
  showTypeMenu() {
    if (this.showType === false) {
      this.showType = true;
      this.showTypeMenuIcon = 'arrow-dropdown';
    } else {
      this.showType = false;
      this.showTypeMenuIcon = 'arrow-dropright';
    }
  }
  showTypeCategoryMenu(object) {
    const index = this.types.indexOf(object);

    if (this.types[index].show === false) {
      this.types[index].show = true;
      this.types[index].showIcon = 'arrow-dropdown';
    } else {
      this.types[index].show = false;
      this.types[index].showIcon = 'arrow-dropright';
    }
  }
}
