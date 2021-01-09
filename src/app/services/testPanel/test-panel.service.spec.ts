import { TestBed } from '@angular/core/testing';

import { TestPanelService } from './test-panel.service';

describe('TestPanelService', () => {
  let service: TestPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
