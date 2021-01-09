import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './Components/company/company.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SellBuyComponent } from './Components/sell-buy/sell-buy.component';
import { TestHistoryComponent } from './Components/test-history/test-history.component';
import { TestPanelComponent } from './Components/test-panel/test-panel.component';
import { UserOrdersComponent } from './Components/user-orders/user-orders.component';

const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'userOrders', component: UserOrdersComponent },
  { path: 'sell-buy', component: SellBuyComponent},
  { path: 'test-panel', component: TestPanelComponent},
  { path: 'test-history', component: TestHistoryComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
