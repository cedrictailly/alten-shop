import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../modules/app-breadcrumb/app-breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  lines = Array(20).fill('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, minus dolorum. Aliquam in, molestias soluta laboriosam dolore reprehenderit dignissimos porro deleniti, consequatur ipsam delectus alias harum sit eligendi, officia illo?')

  constructor(
    private appBreadcrumbService: AppBreadcrumbService,
  ) { }

  ngOnInit() {
    this.appBreadcrumbService.update([]);
  }
}
