import { TestBed } from '@angular/core/testing';

import { PlotCompanyService } from './plot-company.service';

describe('PlotCompanyService', () => {
  let service: PlotCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlotCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
