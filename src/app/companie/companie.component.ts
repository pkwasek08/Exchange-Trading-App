import { Component, OnInit } from '@angular/core';
import { Companie } from '../models/companie';
import { CompanieService } from '../companie.service';

@Component({
  selector: 'app-companie',
  templateUrl: './companie.component.html',
  styleUrls: ['./companie.component.css']
})
export class CompanieComponent implements OnInit {
  companies$: Companie[];
  constructor(private companieService: CompanieService) { }

  ngOnInit() {
    return this.companieService.getCompanies()
    .subscribe(companie => this.companies$ = companie);
  }

}
