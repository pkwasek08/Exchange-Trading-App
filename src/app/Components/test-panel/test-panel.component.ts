import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestDetails } from 'src/app/models/testDetails';
import { TestPanelService } from 'src/app/services/testPanel/test-panel.service';

@Component({
  selector: 'app-test-panel',
  templateUrl: './test-panel.component.html',
  styleUrls: ['./test-panel.component.css']
})
export class TestPanelComponent implements OnInit {

  public testUserNumber = 1;
  public testSeriesNumber = 1;
  public testName = '';
  public testDetails: TestDetails;
  public testDetailsList: TestDetails[];
  public isShowSpinner = false;
  constructor(private snackBar: MatSnackBar,
              private testPanelService: TestPanelService) { }

  ngOnInit(): void {
  }


  doTest(){
    this.isShowSpinner = true;
    this.testPanelService.doTest(this.testUserNumber, this.testSeriesNumber, this.testName).subscribe(testDetails => {
      this.testDetails = testDetails;
      this.isShowSpinner = false;
    });
    console.log(this.testDetails);
  }

  clearNewPanelTest(){

  }

  getTesterTime(){
    return this.testDetails.fullTestTime - this.testDetails.exeTime;
  }
}
