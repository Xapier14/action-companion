import { TestBed } from '@angular/core/testing';

import { IdentityCacheService } from './identity-cache.service';

describe('IdentityCacheService', () => {
  let service: IdentityCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
