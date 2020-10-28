import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanieComponent } from './Components/companie/companie.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SellBuyComponent } from './Components/sell-buy/sell-buy.component';
import { UserOrdersComponent } from './Components/user-orders/user-orders.component';

const routes: Routes = [
  { path: 'companie', component: CompanieComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'userOrders', component: UserOrdersComponent },
  { path: 'sell-buy', component: SellBuyComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
