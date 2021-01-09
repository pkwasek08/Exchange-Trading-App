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

  doTest(numberUser: number, numberSeries:number, testName: string){
    const params = new HttpParams().set('numberUser', numberUser.toString()).set('numberSeries', numberSeries.toString()).set('testName', testName);
    return this.http.get<TestDetails>(this.apiTestUrl + '/simulate?' + params);
  }

  getAllTestDetails(){
    return this.http.get<TestDetails[]>(this.apiTestUrl + '/AllDetails');
  }
}
