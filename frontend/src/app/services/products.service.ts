import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl, httpOptions } from '../config';

export interface PublicProduct {
  id             : number;
  code           : string;
  name           : string;
  description    : string;
  price          : number;
  inventoryStatus: string;
  category       : string;
  image          : string;
  rating         : number;
};

export interface Product extends PublicProduct {
  quantity: number;
};

export interface PublicProductsParams {
  offset    : number;
  sortField?: string;
  sortOrder?: number;
  name?     : string;
}

export interface ProductsParams extends PublicProductsParams {
  limit: number;
  code?: string;
}

export interface PublicProductsResponse {
  count: number;
  rows : PublicProduct[];
}

export interface ProductsResponse {
  count: number;
  rows : Product[];
}

export interface ProductResponse {
  status: "ok" | "error";
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getPublicProducts(params: PublicProductsParams) {
    return this.http.get<PublicProductsResponse>(`${baseUrl}/products`, {
      ...httpOptions,
      params: {...params}
    });
  }

  getProducts(params: ProductsParams) {
    return this.http.get<ProductsResponse>(`${baseUrl}/admin/products`, {
      ...httpOptions,
      params: {...params}
    });
  }

  create(product: Product) {
    return this.http.post<ProductResponse>(`${baseUrl}/admin/products`, product, httpOptions);
  }

  update(product: Product) {
    return this.http.put<ProductResponse>(`${baseUrl}/admin/products/${product.id}`, product, httpOptions);
  }

  delete(target: number|number[]) {

    target = Array.isArray(target) ? target : [target];

    return this.http.delete(`${baseUrl}/admin/products`, {
      ...httpOptions,
      body: {ids: target},
    });
  }

  get(id: number) {
    return this.http.get<Product>(`${baseUrl}/admin/products/${id}`, httpOptions);
  }
}
