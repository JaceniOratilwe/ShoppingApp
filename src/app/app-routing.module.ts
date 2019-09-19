import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'item', loadChildren: './item/item.module#ItemPageModule' },
  { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' },
  { path: 'signout', loadChildren: './signout/signout.module#SignoutPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'first-page', loadChildren: './first-page/first-page.module#FirstPagePageModule' },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
