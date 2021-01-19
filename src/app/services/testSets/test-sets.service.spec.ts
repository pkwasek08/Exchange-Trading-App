import { TestBed } from '@angular/core/testing';

import { TestSetsService } from './test-sets.service';

describe('TestSetsService', () => {
  let service: TestSetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
