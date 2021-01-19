import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestSets } from 'src/app/models/testSets';
import { TestSetsInfo } from 'src/app/models/testSetsInfo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestSetsService {
  apiTestUrl = environment.apiTesterUrl + 'testSets';

  constructor(private http: HttpClient) { }

  getTestSets() {
    return this.http.get<TestSets[]>(this.apiTestUrl);
  }

  getTestSetsById(id: number) {
    return this.http.get<TestSets>(this.apiTestUrl + "/" + id);
  }

  addTestSets(newTestSets: TestSets) {
    return this.http.post(this.apiTestUrl, newTestSets);
  }

  getTestSetsInfoList() {
    return this.http.get<TestSetsInfo[]>(this.apiTestUrl + '/info');
  }
}
