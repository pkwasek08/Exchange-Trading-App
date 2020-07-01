import { Component, OnInit } from '@angular/core';
import { Companie } from './models/companie';
import { CompanieService } from './companie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-app';
  companies$: Companie[];
  constructor(private companieService: CompanieService) { }

  ngOnInit() {
    return this.companieService.getCompanies()
    .subscribe(companie => this.companies$ = companie);
  }
}
