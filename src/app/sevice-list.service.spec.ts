import { TestBed } from '@angular/core/testing';

import { SeviceOverviewByCliService } from './sevice-overview-by-cli.service';

describe('SeviceOverviewByCliService', () => {
  let service: SeviceOverviewByCliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeviceOverviewByCliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
