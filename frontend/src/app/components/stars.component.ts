import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss'
})
export class StarsComponent {

  @Input() value: number = 0;
  @Input() max  : number = 5;

  clamp(value: number) {
    return Math.max(0, Math.min(value || 0, this.max));
  }
}