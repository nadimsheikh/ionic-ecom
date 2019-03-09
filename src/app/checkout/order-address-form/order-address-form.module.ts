import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderAddressFormPage } from './order-address-form.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAddressFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderAddressFormPage]
})
export class OrderAddressFormPageModule {}
