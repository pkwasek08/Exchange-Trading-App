import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { off } from 'process';
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
}
