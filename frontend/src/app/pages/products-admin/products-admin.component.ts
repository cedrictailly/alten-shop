import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../../modules/app-breadcrumb/app-breadcrumb.service';
import { ProductsService, Product, ProductsParams } from '../../services/products.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.scss',
  providers: [MessageService]
})
export class ProductsAdminComponent implements OnInit {

  items        : Product[] = [];
  selectedItems: Product[] = [];
  total        : number    = 0;

  limit  : number = 10;
  offset : number = 0;

  sortField?: string;
  sortOrder?: number;

  codeFilter: string = '';
  nameFilter: string = '';

  dialogVisible: boolean  = false;
  dialogTitle  : string   = '';
  dialogErrors : Message[] = [];
  dialogForm = new FormGroup({
    id: new FormControl(),
    code: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    inventoryStatus: new FormControl(),
    category: new FormControl(),
    image: new FormControl(),
    rating: new FormControl(),
  });

  inventoryStatuses = ["INSTOCK", "LOWSTOCK", "OUTOFSTOCK"];
  categories = ["Accessories", "Clothing", "Electronics", "Fitness"];
  ratings = [5, 4, 3, 2, 1, 0];

  constructor(
    private appBreadcrumbService: AppBreadcrumbService,
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.appBreadcrumbService.update([
      { label: 'Admin' }
    ]);
  }

  refresh() {

    const params: ProductsParams = {
      limit    : this.limit,
      offset   : this.offset,
    }

    if ( this.sortField ) {
      params.sortField = this.sortField;
      params.sortOrder = this.sortOrder;
    }

    if ( this.codeFilter.length > 0 )
      params.code = this.codeFilter;

    if ( this.nameFilter.length > 0 )
      params.name = this.nameFilter;

    this.productsService.getProducts(params).subscribe({
      next: (response) => {
        this.total = response.count;
        this.items = response.rows;
      }
    });
  }

  onLoad($event: TableLazyLoadEvent) {

    this.offset = $event.first ?? 0;
    this.limit  = $event.rows  ?? 10;

    this.sortField = typeof $event.sortField == 'string' ? $event.sortField : $event.sortField?.[0];
    this.sortOrder = $event.sortOrder ?? undefined;

    this.refresh();
  }

  onFilterUpdated() {
    this.offset = 0;
    this.refresh();
  }

  onNew() {

    this.dialogForm.reset({
      id             : 0,
      code           : '',
      name           : '',
      description    : '',
      price          : 0,
      quantity       : 0,
      inventoryStatus: this.inventoryStatuses[0],
      category       : this.categories[0],
      image          : '',
      rating         : 0,
    });

    this.dialogTitle   = 'New Product';
    this.dialogVisible = true;

    this.messageService.clear();
  }

  onEdit(product: Product) {

    this.dialogForm.reset(product);

    this.dialogTitle   = product.name;
    this.dialogVisible = true;

    this.messageService.clear();
  }

  onDelete(product?: Product) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product ? product.name : 'all selected products'} ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        if ( product )
          this.productsService.delete(product.id).subscribe({
            next: () => this.refresh()
          });
        else
        {
          this.productsService.delete(
            this.selectedItems.map(item => item.id)
          ).subscribe({
            next: () => this.refresh()
          });
        }
      }
    });
  }

  onDialogHide() {
    this.dialogVisible = false;
  }

  displayDialogErrors(errors: string[]) {
    this.messageService.addAll(errors.map(error => ({
      severity: 'error',
      detail: error
    })));
  }

  onDialogSubmit() {

    if ( this.dialogForm.value.id > 0 )
    {
      this.productsService.update(this.dialogForm.value as Product).subscribe({
        next: (response) => {
          if ( response.errors ) {
            this.displayDialogErrors(response.errors);
          } else {
            this.refresh();
            this.onDialogHide();
          }
        }
      });
    }
    else
    {
      this.productsService.create(this.dialogForm.value as Product).subscribe({
        next: (response) => {
          if ( response.errors ) {
            this.displayDialogErrors(response.errors);
          } else {
            this.refresh();
            this.onDialogHide();
          }
        }
      });
    }
  }
}
