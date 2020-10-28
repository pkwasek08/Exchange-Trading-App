import { TestBed } from '@angular/core/testing';

import { OfferSellBuyService } from './offer-sell-buy.service';

describe('OfferSellBuyService', () => {
  let service: OfferSellBuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferSellBuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
