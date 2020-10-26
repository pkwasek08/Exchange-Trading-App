import { TestBed } from '@angular/core/testing';

import { CompanieStatisticService } from './companie-statistic.service';

describe('CompanieStatisticService', () => {
  let service: CompanieStatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanieStatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
