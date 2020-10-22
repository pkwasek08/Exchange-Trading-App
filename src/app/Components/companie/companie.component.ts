import { Component, OnInit } from '@angular/core';
import { Companie } from '../../models/companie';
import { CompanieService } from '../../services/companie/companie.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-companie',
  templateUrl: './companie.component.html',
  styleUrls: ['./companie.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanieComponent implements OnInit {
  panelOpenState = false;
  companies$: Companie[];
  displayedColumns = ['name', 'industry', 'revenue', 'capital'];
  dataSource = this.companieService.getCompanies();
  constructor(private companieService: CompanieService) { }
  ngOnInit() {
    return this.companieService.getCompanies()
      .subscribe(companie => this.companies$ = companie);
  }

  expandCollapse(row) {
    if (row.isExpanded) {
      row.isExpanded = false;
    } else {
      row.isExpanded = true;
    }
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
}