import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanieComponent } from './components/companie/companie.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegistrationComponent } from './Components/registration/registration.component';

const routes: Routes = [
  { path: 'companie', component: CompanieComponent },
  { path: 'profile', component: ProfileComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
