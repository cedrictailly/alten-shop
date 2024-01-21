import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsAdminComponent } from './pages/products-admin/products-admin.component';
import { AdminGuard } from './guards/admin.guard';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'admin/products', component: ProductsAdminComponent, canActivate: [AdminGuard] },
  { path: 'error/:code', component: ErrorComponent },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
