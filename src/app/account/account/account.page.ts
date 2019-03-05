import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../provider/account/user/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public data;
  public name;
  public email;
  public contact;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['login']);
    } else {
      this.getData();
      if (this.data) {
        this.name = this.data.name;
        this.email = this.data.email;
        this.contact = this.data.contact;
      }
    }
  }


  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }


  getData(): any {
    this.userService.getStorageData().subscribe(
      (response) => {
        this.data = response;
      }
    );
  }

}
