import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../modules/app-breadcrumb/app-breadcrumb.service';
import { ProductsService, PublicProduct, PublicProductsParams } from '../../services/products.service';
import { TableLazyLoadEvent } from 'primeng/table';

export interface Sort {
  field: string;
  order: number;
}

export interface SortOption {
  label: string;
  value: Sort;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  items : PublicProduct[] = [];
  total : number          = 0;

  offset: number = 0;
  sort  : Sort   = {field: 'price', order: -1 };
  search: string = '';

  sortOptions: SortOption[] = [
    { label: 'Price (ascending)', value: { field: 'price', order: 1 } },
    { label: 'Price (descending)', value: { field: 'price', order: -1 } },
    { label: 'Name (ascending)', value: { field: 'name', order: 1 } },
    { label: 'Name (descending)', value: { field: 'name', order: -1 } },
  ];

  constructor(
    private appBreadcrumbService: AppBreadcrumbService,
    private productsService: ProductsService,
  ) {}

  ngOnInit() {

    this.appBreadcrumbService.update([
      { label: 'Produits' }
    ]);

    this.refresh();
  }

  refresh() {

    const params: PublicProductsParams = {
      offset   : this.offset,
      sortField: this.sort.field,
      sortOrder: this.sort.order,
    }

    if ( this.search.length > 0 )
      params.name = this.search;

    this.productsService.getPublicProducts(params).subscribe({
      next: (response) => {
        this.items = response.rows;
        this.total = response.count;
      }
    });
  }

  onLoad($event: TableLazyLoadEvent) {
    this.offset = $event.first ?? 0;
    this.refresh();
  }
}
