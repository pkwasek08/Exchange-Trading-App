import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestDetails } from 'src/app/models/testDetails';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestPanelService {
  apiTestUrl = environment.apiTesterUrl + 'test';

  constructor(private http: HttpClient) { }

  doTest(numberUser: number, numberSeries:number, companyId:number, startUserMoney:number, startStockNumber:number, testName: string, daysNumber:number){
    const params = new HttpParams().set('numberUser', numberUser.toString())
                                   .set('numberSeries', numberSeries.toString())
                                   .set('companyId', companyId.toString())
                                   .set('startUserMoney', startUserMoney.toString())
                                   .set('startStockNumber', startStockNumber.toString())
                                   .set('testName', testName)
                                   .set('daysNumber', daysNumber.toString());
    return this.http.get<TestDetails[]>(this.apiTestUrl + '/simulate?' + params);
  }

  getAllTestDetails(){
    return this.http.get<TestDetails[]>(this.apiTestUrl + '/AllDetails');
  }
}
