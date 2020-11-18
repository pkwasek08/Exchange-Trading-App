import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CompanyStatistic } from 'src/app/models/companyStatistic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyStatisticService {

  apiUrl = environment.apiUrl + 'companyStatistic';

  constructor(private http: HttpClient) { }

  getCompanyStatisticByCompanyId(companyId: number) {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<CompanyStatistic[]>(this.apiUrl + '/company?' + params);
  }

  getCompanyStatisticPageByCompanyId(companyId: number, page: number, size: number) {
    const params = new HttpParams().set('companyId', companyId.toString())
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<CompanyStatistic[]>(this.apiUrl + '/company/paginator?' + params);
  }

  getCompanyStatisticLatestByCompanyId(companyId: number) {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<CompanyStatistic>(this.apiUrl + '/company/latest?' + params);
  }
}
