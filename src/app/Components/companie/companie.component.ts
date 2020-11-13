import { Component, OnInit } from '@angular/core';
import { Companie } from '../../models/companie';
import { CompanieService } from '../../services/company/companie.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CompanieStatisticService } from 'src/app/services/companieStatistic/companie-statistic.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  companiesData: Companie[];
  displayedColumns = ['name', 'industry', 'revenue', 'capital'];
  dataSource = this.companieService.getCompanies();
  constructor(private companieService: CompanieService,
              private companieStatisticService: CompanieStatisticService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router) { }
  ngOnInit() {
    return this.companieService.getCompanies()
      .subscribe(companie => { this.companiesData = companie });
  }

  getCompanieStatisticByDokumentId(rowId: number) {
    this.companieStatisticService.getCompanieStatisticLatestByCompanieId(this.companiesData[rowId].id).subscribe(companieStatistic =>
      this.companiesData[rowId].companieStatisticLatest = companieStatistic);
  }

  expandCollapse(row) {
    if (row.isExpanded) {
      row.isExpanded = false;
    } else {
      this.getCompanieStatisticByDokumentId(row.id - 1);
      row.isExpanded = true;
    }
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  onClickSellBuy(selectedCompany: Companie) {
    if (this.userService.getUser() == null) {
      this.openDialogLogin();
    } else {
      this.userService.setSelectedCompany(selectedCompany);
      this.router.navigateByUrl('/sell-buy');
    }
  }

  openDialogLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent, dialogConfig);
    this.snackBar.open('You must be logged in', 'x', {
      panelClass: 'custom-css-class-info',
      duration: 5000,
    });
  }
}
