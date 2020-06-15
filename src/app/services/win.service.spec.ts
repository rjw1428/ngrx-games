import { TestBed } from '@angular/core/testing';

import { WinService } from './win.service';

describe('WinService', () => {
  let service: WinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
