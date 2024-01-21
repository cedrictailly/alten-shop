import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import status from "statuses";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {

  code    = 200;
  message = '';

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.code    = +this.route.snapshot.paramMap.get('code')!;
    this.message = status(this.code);
  }
}
