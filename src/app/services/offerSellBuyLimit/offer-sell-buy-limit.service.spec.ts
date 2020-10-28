import { TestBed } from '@angular/core/testing';

import { OfferSellBuyLimitService } from './offer-sell-buy-limit.service';

describe('OfferSellBuyLimitService', () => {
  let service: OfferSellBuyLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferSellBuyLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
