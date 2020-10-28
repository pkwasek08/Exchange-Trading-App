import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deposit } from 'src/app/models/deposit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  apiUrl = environment.apiUrl + 'deposit';

  constructor(private http: HttpClient) { }

  getCashDepositByUserId(userId: number){
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<Deposit>(this.apiUrl + '/user?' + params);
  }
}
