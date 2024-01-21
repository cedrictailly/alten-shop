import { Component } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrl   : './app.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s cubic-bezier(0,.5,.5,1)', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class AppComponent {

  constructor(
    public authService: AuthService,
  ) {}

  title = 'Alten Shop';
}
