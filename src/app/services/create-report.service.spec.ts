import { TestBed } from '@angular/core/testing';

import { CreateReportService } from './create-report.service';

describe('CreateReportService', () => {
  let service: CreateReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
