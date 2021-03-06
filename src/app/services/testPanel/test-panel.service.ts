import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestDetails } from 'src/app/models/testDetails';
import { TestSets } from 'src/app/models/testSets';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestPanelService {
  apiTestUrl = environment.apiTesterUrl + 'test';

  constructor(private http: HttpClient) { }

  
  doTest(testSets: TestSets){
    const params = new HttpParams()
    .set('numberUser', testSets.numberOfUsers.toString())
    .set('numberSeries', testSets.series.toString())
    .set('companyId', testSets.companyId.toString())
    .set('companyName', testSets.companyName)
    .set('startUserMoney', testSets.startUserMoney.toString())
    .set('startStockNumber', testSets.startStockNumber.toString())
    .set('testName', testSets.testName)
    .set('daysNumber', testSets.days.toString());
        return this.http.get<TestDetails[]>(this.apiTestUrl + '/simulate?' + params);
  }

  getAllTestDetails(){
    return this.http.get<TestDetails[]>(this.apiTestUrl + '/AllDetails');
  }
}
