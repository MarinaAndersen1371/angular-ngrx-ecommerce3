import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as fromProduct from 'src/app/modules/products/state/product.reducers';
import { ProductEffects } from 'src/app/modules/products/state/product.effects';
import { ProductAdminEffects } from 'src/app/modules/products/state/productAdmin.effects';
import { ProductsRoutingModule } from 'src/app/modules/products/products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductsComponent } from 'src/app/modules/products/products/products.component';
import { ProductComponent } from 'src/app/modules/products/product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RatingComponent } from 'src/app/modules/products/rating/rating.component';
import { ListFilterPipe } from 'src/app/modules/products/resources/listFilterPipe';

import { AdminProductsComponent } from 'src/app/modules/products/admin-products/admin-products.component';
import { AdminProductComponent } from 'src/app/modules/products/admin-product/admin-product.component';
import { AdminProductEditComponent } from 'src/app/modules/products/admin-product-edit/admin-product-edit.component';
import { AdminProductAddComponent } from 'src/app/modules/products/admin-product-add/admin-product-add.component';

import { ManagerProductsComponent } from 'src/app/modules/products/manager-products/manager-products.component';
import { ManagerProductEditComponent } from 'src/app/modules/products/manager-product-edit/manager-product-edit.component';
import { ManagerProductComponent } from 'src/app/modules/products/manager-product/manager-product.component';
import { ManagerProductAddComponent } from 'src/app/modules/products/manager-product-add/manager-product-add.component';

import { FranchiseListComponent } from 'src/app/modules/products/franchise-list/franchise-list.component';
import { FranchiseProductComponent } from 'src/app/modules/products/franchise-product/franchise-product.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    ListFilterPipe,
    RatingComponent,
    ProductComponent,
    ProductsComponent,
    AdminProductComponent,
    AdminProductsComponent,
    AdminProductEditComponent,
    AdminProductAddComponent,
    AdminProductEditComponent,
    AdminProductAddComponent,
    ManagerProductsComponent,
    ManagerProductEditComponent,
    ManagerProductComponent,
    ManagerProductAddComponent,
    FranchiseProductComponent,
    FranchiseListComponent,
    ProductDetailsComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    StoreModule.forFeature(fromProduct.productsFeatureKey, fromProduct.reducer),
    EffectsModule.forFeature([ProductEffects, ProductAdminEffects]),
  ],
})
export class ProductsModule {}
