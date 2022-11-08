import { TestBed } from '@angular/core/testing';

import { BusManagementService } from './bus-management.service';

describe('BusManagementService', () => {
  let service: BusManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
