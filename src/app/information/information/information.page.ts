import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InformationService } from '../../provider/infoModule/information/information.service';


@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  public id;
  public message;
  public messageTitle;
  public name;
  public description;
  public text;
  constructor(
    private activatedRoute: ActivatedRoute,
    private infoService: InformationService,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getInfo();
  }

  getInfo() {
    this.infoService.detail(this.id).subscribe(
      response => {
        if (!response.status) {
          this.message = response.error;
          this.messageTitle = 'Warning!';
        } else {
          this.message = response.message;
          this.messageTitle = 'Sucess!';
          this.name = response.data.name;
          this.description = response.data.description;
          this.text = response.data.text;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

}
