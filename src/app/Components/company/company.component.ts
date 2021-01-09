import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company/company.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CompanyStatisticService } from 'src/app/services/companyStatistic/company-statistic.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyComponent implements OnInit {
  panelOpenState = false;
  companiesData: Company[];
  displayedColumns = ['name', 'industry', 'revenue', 'capital'];
  dataSource = this.companyService.getCompanies();
  constructor(private companyService: CompanyService,
              private companyStatisticService: CompanyStatisticService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router) { }
  ngOnInit() {
    return this.companyService.getCompanies()
      .subscribe(company =>  this.companiesData = company);
  }

  getCompanyStatisticByDokumentId(rowId: number) {
    this.companyStatisticService.getCompanyStatisticLatestByCompanyId(this.companiesData[rowId].id).subscribe(companyStatistic =>
      this.companiesData[rowId].companyStatisticLatest = companyStatistic);
  }

  expandCollapse(row) {
    if (row.isExpanded) {
      row.isExpanded = false;
    } else {
      this.getCompanyStatisticByDokumentId(row.id - 1);
      row.isExpanded = true;
    }
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  onClickSellBuy(selectedCompany: Company) {
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
