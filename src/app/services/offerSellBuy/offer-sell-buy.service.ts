import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferSellBuy } from 'src/app/models/offerSellBuy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferSellBuyService {
  apiUrl = environment.apiUrl + 'offerSellBuy';

  constructor(private http: HttpClient) { }

  addOffer(offer: OfferSellBuy){
    return this.http.post(this.apiUrl, offer);
  }

  getOffersByUserId(userId: number){
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<OfferSellBuy[]>(this.apiUrl + '/user?' + params);
  }
}
