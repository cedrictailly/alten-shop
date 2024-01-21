import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

import { ConfirmationService } from 'primeng/api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsAdminComponent } from './pages/products-admin/products-admin.component';
import { ProductsComponent } from './pages/products/products.component';
import { StarsComponent } from './components/stars.component';

import { AppBreadcrumbModule } from './modules/app-breadcrumb/app-breadcrumb.module';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    ProductsAdminComponent,
    ProductsComponent,
    StarsComponent,
  ],
  imports: [
    AppBreadcrumbModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    ConfirmDialogModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    MessagesModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    TableModule,
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
