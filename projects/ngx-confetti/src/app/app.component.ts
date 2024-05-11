import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxConfettiExplosionComponent } from 'ngx-confetti-explosion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgxConfettiExplosionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-confetti';
  show = false;
  onShow(){
    this.show = true;
  }
  onExplosionDone(){
    this.show = false;
  }
}
