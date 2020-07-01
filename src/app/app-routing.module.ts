import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanieComponent } from './companie/companie.component';

const routes: Routes = [
  { path: 'companie' , component: CompanieComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
