import { TestBed } from '@angular/core/testing';

import { NgxConfettiExplosionService } from './ngx-confetti-explosion.service';

describe('NgxConfettiExplosionService', () => {
  let service: NgxConfettiExplosionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxConfettiExplosionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
