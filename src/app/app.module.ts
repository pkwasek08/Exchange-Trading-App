import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanieComponent } from './Components/companie/companie.component';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrationComponent } from './Components/registration/registration.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './Components/profile/profile.component';
import { UserOrdersComponent } from './Components/user-orders/user-orders.component';
import { SellBuyComponent } from './Components/sell-buy/sell-buy.component';
import { ChartsModule } from 'ng2-charts';
import {MatPaginatorModule} from '@angular/material/paginator';

const modulesLogin = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [
    AppComponent,
    CompanieComponent,
    MainPageComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    UserOrdersComponent,
    SellBuyComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatDialogModule,
    MatPaginatorModule,
    ChartsModule,
    modulesLogin,
    MatDatepickerModule,
    MatTableModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserModule,
    CommonModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, modulesLogin],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
