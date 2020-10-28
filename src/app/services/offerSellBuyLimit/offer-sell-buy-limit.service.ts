import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferSellBuyLimit } from 'src/app/models/offerSellBuyLimit';
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
}
