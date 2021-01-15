import { Component, OnInit } from '@angular/core';
import { TestDetails } from 'src/app/models/testDetails';
import { TestPanelService } from 'src/app/services/testPanel/test-panel.service';

@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.css']
})
export class TestHistoryComponent implements OnInit {
  public testDetailsList: TestDetails[];
  public isShowSpinner = true;

  constructor(private testPanelService: TestPanelService) { }

  ngOnInit(): void {
    this.testPanelService.getAllTestDetails().subscribe(testDetailsList => {
      this.testDetailsList = testDetailsList;
      this.isShowSpinner = false;
    });
  }

  getTesterTime(testDetails: TestDetails) {
    return testDetails.fullTestTime - testDetails.exeTime;
  }
}
