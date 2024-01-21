import { MenuItem } from "primeng/api";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppBreadcrumbService {

  private items = new Subject<MenuItem[]>();

  constructor() {
    this.items.next([]);
  }

  get items$() {
    return this.items.asObservable();
  }

  update(items: MenuItem[]) {
    this.items.next(items);
  }
}
