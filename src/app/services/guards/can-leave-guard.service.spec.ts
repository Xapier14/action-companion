import { TestBed } from '@angular/core/testing';

import { CanLeaveGuardService } from './can-leave-guard.service';

describe('CanLeaveGuardService', () => {
  let service: CanLeaveGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanLeaveGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
