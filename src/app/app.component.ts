import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      title: 'Products',
      url: '/list',
      icon: 'list'
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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
