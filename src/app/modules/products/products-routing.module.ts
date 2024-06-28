import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/modules/users/resources/auth.guard';
import { AdminGuard } from 'src/app/modules/users/resources/admin.guard';
import { ManagerGuard } from 'src/app/modules/users/resources/manager.guard';
import { FranchiseGuard } from 'src/app/modules/users/resources/franchise.guard';
import { ProductComponent } from 'src/app/modules/products/product/product.component';
import { ProductsComponent } from 'src/app/modules/products/products/products.component';
import { AdminProductsComponent } from 'src/app/modules/products/admin-products/admin-products.component';
import { AdminProductComponent } from 'src/app/modules/products/admin-product/admin-product.component';
import { AdminProductEditComponent } from 'src/app/modules/products/admin-product-edit/admin-product-edit.component';
import { AdminProductAddComponent } from 'src/app/modules/products/admin-product-add/admin-product-add.component';
import { ManagerProductsComponent } from 'src/app/modules/products/manager-products/manager-products.component';
import { FranchiseListComponent } from 'src/app/modules/products/franchise-list/franchise-list.component';
import { FranchiseProductComponent } from 'src/app/modules/products/franchise-product/franchise-product.component';
import { ManagerProductEditComponent } from 'src/app/modules/products/manager-product-edit/manager-product-edit.component';
import { ManagerProductComponent } from 'src/app/modules/products/manager-product/manager-product.component';
import { ManagerProductAddComponent } from 'src/app/modules/products/manager-product-add/manager-product-add.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  //*********** Admin area ***/
  {
    path: 'admin-product/:id',
    canActivate: [AdminGuard],
    component: AdminProductComponent,
  },
  {
    path: 'admin-product-add',
    canActivate: [AdminGuard],
    component: AdminProductAddComponent,
  },
  {
    path: 'admin-product-edit/:id',
    canActivate: [AdminGuard],
    component: AdminProductEditComponent,
  },
  {
    path: 'admin-products',
    canActivate: [AdminGuard],
    component: AdminProductsComponent,
  },
  //*********** Manager area ***/
  {
    path: 'manager-product/:id',
    canActivate: [ManagerGuard],
    component: ManagerProductComponent,
  },
  {
    path: 'manager-product-add',
    canActivate: [ManagerGuard],
    component: ManagerProductAddComponent,
  },
  {
    path: 'manager-product-edit/:id',
    canActivate: [ManagerGuard],
    component: ManagerProductEditComponent,
  },
  {
    path: 'manager-products',
    canActivate: [ManagerGuard],
    component: ManagerProductsComponent,
  },
  //*********** Franchise area ***/
  {
    path: 'franchise-list',
    canActivate: [FranchiseGuard],
    component: FranchiseListComponent,
  },
  {
    path: 'franchise-product/:id',
    canActivate: [FranchiseGuard],
    component: FranchiseProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
