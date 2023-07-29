import { NgModule } from '@angular/core';
import { NgxConfettiExplosionComponent } from './ngx-confetti-explosion.component';
import { NgFor } from '@angular/common';



@NgModule({
  declarations: [
    NgxConfettiExplosionComponent
  ],
  imports: [
    NgFor
  ],
  exports: [
    NgxConfettiExplosionComponent
  ]
})
export class NgxConfettiExplosionModule { }
