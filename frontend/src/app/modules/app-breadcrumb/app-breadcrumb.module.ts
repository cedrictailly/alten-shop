import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { AppBreadcrumbComponent } from './app-breadcrumb.component';
import { AppBreadcrumbService } from './app-breadcrumb.service';

@NgModule({
  declarations: [ AppBreadcrumbComponent ],
  exports     : [ AppBreadcrumbComponent ],
  bootstrap   : [ AppBreadcrumbComponent ],
  providers   : [ AppBreadcrumbService ],
  imports: [
    CommonModule,
    BreadcrumbModule,
  ]
})
export class AppBreadcrumbModule { }
