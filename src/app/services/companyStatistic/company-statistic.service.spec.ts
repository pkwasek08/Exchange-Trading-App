import { TestBed } from '@angular/core/testing';

import { CompanyStatisticService } from './company-statistic.service';

describe('CompanyStatisticService', () => {
  let service: CompanyStatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyStatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
