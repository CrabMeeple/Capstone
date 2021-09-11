import { TestBed } from '@angular/core/testing';

import { HorsesService } from './horses.service';

describe('HorsesService', () => {
  let service: HorsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
