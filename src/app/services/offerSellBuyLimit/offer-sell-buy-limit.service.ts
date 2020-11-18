import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferSellBuyLimit } from 'src/app/models/offerSellBuyLimit';
import { OfferTableView } from 'src/app/models/offerTableView';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferSellBuyLimitService {
  apiUrl = environment.apiUrl + 'offerSellBuyLimit';

  constructor(private http: HttpClient) { }

  addOfferLimit(offer: OfferSellBuyLimit){
    return this.http.post(this.apiUrl, offer);
  }

  removeOfferLimit(offerId: number){
    return this.http.delete(this.apiUrl + '/' + offerId);
  }


  getOffersBuyLimitByCompanyId(companyId: number) {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<OfferTableView[]>(this.apiUrl + '/buy/company?' + params);
  }

  getOffersSellLimitByCompanyId(companyId: number) {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<OfferTableView[]>(this.apiUrl + '/sell/company?' + params);
  }

  getOffersLimitByUserId(userId: number) {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<OfferSellBuyLimit[]>(this.apiUrl + '/user?' + params);
  }
}
