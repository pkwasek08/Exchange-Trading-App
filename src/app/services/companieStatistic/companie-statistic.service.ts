import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CompanieStatistic } from 'src/app/models/companieStatistic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanieStatisticService {

  apiUrl = environment.apiUrl + 'companieStatistic';

  constructor(private http: HttpClient) { }

  getCompanieStatisticByCompanieId(companieId: number) {
    const params = new HttpParams().set('companieId', companieId.toString());
    return this.http.get<CompanieStatistic[]>(this.apiUrl + '/companie?' + params);
  }

  getCompanieStatisticPageByCompanieId(companieId: number, page: number, size: number) {
    const params = new HttpParams().set('companieId', companieId.toString())
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<CompanieStatistic[]>(this.apiUrl + '/companie/paginator?' + params);
  }

  getCompanieStatisticLatestByCompanieId(companieId: number) {
    const params = new HttpParams().set('companieId', companieId.toString());
    return this.http.get<CompanieStatistic>(this.apiUrl + '/companie/latest?' + params);
  }
}
