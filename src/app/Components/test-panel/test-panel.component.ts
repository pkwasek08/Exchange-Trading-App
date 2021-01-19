import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyInfo } from 'src/app/models/companyInfo';
import { TestDetails } from 'src/app/models/testDetails';
import { TestSets } from 'src/app/models/testSets';
import { TestSetsInfo } from 'src/app/models/testSetsInfo';
import { CompanyService } from 'src/app/services/company/company.service';
import { TestPanelService } from 'src/app/services/testPanel/test-panel.service';
import { TestSetsService } from 'src/app/services/testSets/test-sets.service';

@Component({
  selector: 'app-test-panel',
  templateUrl: './test-panel.component.html',
  styleUrls: ['./test-panel.component.css']
})
export class TestPanelComponent implements OnInit {

  public testCompanyList: CompanyInfo[] = [];
  public testSelectedCompany: CompanyInfo = new CompanyInfo(null, null);
  public newTestSets: TestSets;
  public testSetsInfoList: TestSetsInfo[] = [];
  public testSetsInfoSelectedId: number;
  public testSetsList: TestSets[] = [];
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
    private testSetsService: TestSetsService,
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.initCompanyList();
    this.newTestSets = new TestSets(0, 2, 1, 0, null, 10000, 10, null, 1);
    this.initTestSetsInfoList();
  }


  doTest() {
    this.isShowSpinner = true;
    this.newTestSets.companyId = this.testSelectedCompany.companyId;
    this.newTestSets.companyName = this.testSelectedCompany.companyName;
    this.testPanelService.doTest(this.newTestSets).subscribe(testDetails => {
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

  onClickStartBtn() {
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

  onClickSaveBtn() {
    this.testUserNumberFormControl.markAsTouched();
    this.testSeriesNumberFormControl.markAsTouched();
    this.testChosedCompanyFormControl.markAsTouched();
    this.testStartStockNumberFormControl.markAsTouched();
    this.testStartUserMoneyFormControl.markAsTouched();
    this.testNameFormControl.markAsTouched();
    this.testDaysFormControl.markAsTouched();
    if (this.isValidNewTest()) {
      this.saveTest();
    }
  }

  saveTest() {
    this.isShowSpinner = true;
    this.newTestSets.companyId = this.testSelectedCompany.companyId;
    this.newTestSets.companyName = this.testSelectedCompany.companyName;
    this.testSetsService.addTestSets(this.newTestSets).subscribe(results => {
      this.snackBar.open('New test sets added correct', 'x', {
        panelClass: 'custom-css-class-success',
        duration: 5000,
      });
      this.initTestSetsInfoList();
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

  isValidNewTest() {
    return this.testUserNumberFormControl.valid && this.testSeriesNumberFormControl.valid && this.testChosedCompanyFormControl.valid
      && this.testStartStockNumberFormControl.valid && this.testStartUserMoneyFormControl.valid && this.testNameFormControl.valid && this.testDaysFormControl.valid;
  }

  getTesterTime(fullTestTime: number, exeTime: number) {
    return fullTestTime - exeTime;
  }

  initTestSetsList() {
    this.testSetsService.getTestSets().subscribe(testSetsList => {
      this.testSetsList = testSetsList;
    });

  }

  initTestSetsInfoList() {
    this.testSetsService.getTestSetsInfoList().subscribe(testSetsInfoList => {
      this.testSetsInfoList = [];
      this.testSetsInfoList.push(new TestSetsInfo(0, "NEW TEST"));
      this.testSetsInfoSelectedId = 0;
      testSetsInfoList.forEach(testSetsInfo => this.testSetsInfoList.push(testSetsInfo));
    });

  }

  changeTestSets() {
    if (this.testSetsInfoSelectedId != null && this.testSetsInfoSelectedId != 0) {
      this.testSetsService.getTestSetsById(this.testSetsInfoSelectedId).subscribe(testSets => {
        this.newTestSets = testSets;
        this.testSelectedCompany = new CompanyInfo(this.newTestSets.companyId, this.newTestSets.companyName);
      });
    } else {
      this.newTestSets = new TestSets(0, 2, 1, 0, null, 10000, 10, null, 1);
      this.testSelectedCompany = new CompanyInfo(null, null);
    }
  }

  initCompanyList() {
    this.testCompanyList.push(new CompanyInfo(0, "Random"));
    this.companyService.getCompaniesInfo().subscribe(companyList => companyList.forEach(company => this.testCompanyList.push(company)));
  }

}
