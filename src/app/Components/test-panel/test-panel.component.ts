import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/models/company';
import { TestDetails } from 'src/app/models/testDetails';
import { CompanyService } from 'src/app/services/company/company.service';
import { TestPanelService } from 'src/app/services/testPanel/test-panel.service';

@Component({
  selector: 'app-test-panel',
  templateUrl: './test-panel.component.html',
  styleUrls: ['./test-panel.component.css']
})
export class TestPanelComponent implements OnInit {

  public testUserNumber = 2;
  public testSeriesNumber = 1;
  public testCompanyList: Company[] = [];
  public testSelectedCompany: Company;
  public testStartStockNumber = 1;
  public testStartUserMoney = 1000;
  public testName = '';
  public testDaysNumber = 1;
  public testDetailsList: TestDetails[] = [];
  public isShowSpinner = false;
  testUserNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.min(2)
  ]);
  testSeriesNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1)
  ]);
  testChosedCompanyFormControl = new FormControl('', [
    Validators.required
  ]);
  testStartStockNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  testStartUserMoneyFormControl = new FormControl(null, [
    Validators.required,
    Validators.min(1000)
  ]);
  testNameFormControl = new FormControl('', [
    Validators.required
  ]);
  testDaysFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1)
  ]);

  constructor(private snackBar: MatSnackBar,
    private testPanelService: TestPanelService,
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.testCompanyList.push(new Company(0, "Random", null, null, null, null, null));
    this.companyService.getCompanies().subscribe(companyList => companyList.forEach(company => this.testCompanyList.push(company)));
  }


  doTest() {
    this.isShowSpinner = true;
    this.testPanelService.doTest(this.testUserNumber, this.testSeriesNumber, this.testSelectedCompany.id, this.testStartUserMoney, this.testStartStockNumber, this.testName, this.testDaysNumber).subscribe(testDetails => {
      this.testDetailsList = testDetails;
      this.isShowSpinner = false;
    },
      (error) => {
        this.snackBar.open(error.status + ' error :(', 'x', {
          panelClass: 'custom-css-class-error',
          duration: 5000,
        });
        this.isShowSpinner = false;
      });
  }

  clearNewPanelTest() {

  }

  onClickTestBtn() {
    this.testUserNumberFormControl.markAsTouched();
    this.testSeriesNumberFormControl.markAsTouched();
    this.testChosedCompanyFormControl.markAsTouched();
    this.testStartStockNumberFormControl.markAsTouched();
    this.testStartUserMoneyFormControl.markAsTouched();
    this.testNameFormControl.markAsTouched();
    this.testDaysFormControl.markAsTouched();
    if (this.isValidNewTest()) {
      this.doTest();
    }
  }

  isValidNewTest() {
    return this.testUserNumberFormControl.valid && this.testSeriesNumberFormControl.valid && this.testChosedCompanyFormControl.valid
      && this.testStartStockNumberFormControl.valid && this.testStartUserMoneyFormControl.valid && this.testNameFormControl.valid && this.testDaysFormControl.valid;
  }

  getTesterTime(fullTestTime: number, exeTime: number) {
    return fullTestTime - exeTime;
  }
}
