import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManufactureDetailPage } from './manufacture-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ManufactureDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManufactureDetailPage]
})
export class ManufactureDetailPageModule {}
