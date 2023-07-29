import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxConfettiExplosionComponent } from './ngx-confetti-explosion.component';

describe('NgxConfettiExplosionComponent', () => {
  let component: NgxConfettiExplosionComponent;
  let fixture: ComponentFixture<NgxConfettiExplosionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxConfettiExplosionComponent]
    });
    fixture = TestBed.createComponent(NgxConfettiExplosionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
