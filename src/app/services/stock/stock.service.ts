import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockUserTableView } from 'src/app/models/stockUserTableView';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  apiUrl = environment.apiUrl + 'stock';

  constructor(private http: HttpClient) { }

  getStockByUserId(userId: number){
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<Stock[]>(this.apiUrl + '/user?' + params);
  }

  getStockByUserIdTableView(userId: number){
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<StockUserTableView[]>(this.apiUrl + '/view/user?' + params);
  }

  getStockByUserIdAndCompanyId(userId: number, companyId: number){
    const params = new HttpParams().set('userId', userId.toString()).set('companyId', companyId.toString());
    return this.http.get<Stock>(this.apiUrl + '/user/company?' + params);
  }
}
