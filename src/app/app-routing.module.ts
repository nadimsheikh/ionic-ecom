import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'account', loadChildren: './account/account/account.module#AccountPageModule' },
  { path: 'login', loadChildren: './account/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './account/register/register.module#RegisterPageModule' },
  { path: 'forgot-password', loadChildren: './account/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'reset-password', loadChildren: './account/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'reset-email', loadChildren: './account/reset-email/reset-email.module#ResetEmailPageModule' },
  { path: 'reset-contact', loadChildren: './account/reset-contact/reset-contact.module#ResetContactPageModule' },
  { path: 'reset-account', loadChildren: './account/reset-account/reset-account.module#ResetAccountPageModule' },
  { path: 'product-list', loadChildren: './product/product-list/product-list.module#ProductListPageModule' },
  { path: 'product-detail', loadChildren: './product/product-detail/product-detail.module#ProductDetailPageModule' },
  { path: 'manufacture-list', loadChildren: './product/manufacture-list/manufacture-list.module#ManufactureListPageModule' },
  { path: 'manufacture-detail', loadChildren: './product/manufacture-detail/manufacture-detail.module#ManufactureDetailPageModule' },
  { path: 'wishlist', loadChildren: './account/wishlist/wishlist.module#WishlistPageModule' },
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'information/:id', loadChildren: './information/information/information.module#InformationPageModule' },
  { path: 'contact', loadChildren: './information/contact/contact.module#ContactPageModule' },
  { path: 'notification', loadChildren: './information/notification/notification.module#NotificationPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'product-filter', loadChildren: './product/product-filter/product-filter.module#ProductFilterPageModule' },
  { path: 'search', loadChildren: './product/search/search.module#SearchPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
