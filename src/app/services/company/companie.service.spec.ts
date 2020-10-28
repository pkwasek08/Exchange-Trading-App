import { TestBed } from '@angular/core/testing';

import { CompanieService } from './companie.service';

describe('CompanieService', () => {
  let service: CompanieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
