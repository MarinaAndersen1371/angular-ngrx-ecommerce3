import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/modules/products/resources/product';

/*****LOAD PRODUCTS ***/
export const loadProducts = createAction('[Products Component] Load Products');
export const loadAdminProducts = createAction(
  '[Admin Products Component] Load Admin Products',
  props<{ role: string }>()
);
export const loadManagerProducts = createAction(
  '[Manager Products Component] Load Manager Products',
  props<{ role: string }>()
);
export const loadFranchiseProducts = createAction(
  '[Franchise Products Component] Load Franchise Products'
);
export const loadProductsSuccess = createAction(
  '[Product Effect] Load Products Success',
  props<{ products: Product[]; topProducts: Product[]; statistics: any }>()
);
export const loadProductsFailure = createAction(
  '[Product Effect] Load Products Failure',
  props<{ error: any }>()
);

/*****LOAD PRODUCT ***/
export const loadProduct = createAction(
  '[Product Component] Load Product',
  props<{ id: string }>()
);
export const loadAdminProduct = createAction(
  '[Admin Product Component] Load Admin Product',
  props<{ id: string; role: string }>()
);
export const loadManagerProduct = createAction(
  '[Manager Product Component] Load Manager Product',
  props<{ id: string; role: string }>()
);
export const loadFranchiseProduct = createAction(
  '[Franchise Product Component] Load Franchise Product',
  props<{ id: string }>()
);
export const loadProductSuccess = createAction(
  '[Product Effect] Load Product Success',
  props<{ product: Product }>()
);
export const loadProductFailure = createAction(
  '[Product Effect] Load Product Failure',
  props<{ error: any }>()
);

/*****ADD INDIVIDUAL PRODUCT ***/
export const addAdminProduct = createAction(
  '[Admin Product Add Component] Add Admin Product',
  props<{
    name: string;
    brand: string;
    category: string;
    description: string;
    pricePurchase: number;
    price: number;
    quantity: number;
    extra: boolean;
    imageUrl: string;
    modifiedBy: string;
  }>()
);
export const addManagerProduct = createAction(
  '[Manager Product Add Component] Add Manager Product',
  props<{
    name: string;
    brand: string;
    category: string;
    description: string;
    pricePurchase: number;
    price: number;
    quantity: number;
    extra: boolean;
    imageUrl: string;
    modifiedBy: string;
  }>()
);
export const addProductSuccess = createAction(
  '[Product Effect] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailure = createAction(
  '[Product Effect] Add Product Failure',
  props<{ error: any }>()
);

/*****UPDATE INDIVIDUAL PRODUCT ***/
export const updateAdminProduct = createAction(
  '[Admin Product Edit Component] Update Admin Product',
  props<{
    id: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    pricePurchase: number;
    price: number;
    quantity: number;
    extra: boolean;
    imageUrl: string;
    modifiedBy: string;
  }>()
);
export const updateManagerProduct = createAction(
  '[Manager Product Edit Component] Update Manager Product',
  props<{
    id: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    pricePurchase: number;
    price: number;
    quantity: number;
    extra: boolean;
    imageUrl: string;
    modifiedBy: string;
  }>()
);
export const updateProductSuccess = createAction(
  '[Product Effect] Update Product Success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Product Effect] Update Product Failure',
  props<{ error: any }>()
);

/*****DELETE INDIVIDUAL PRODUCT ***/
export const deleteAdminProduct = createAction(
  '[Admin Products Component, Admin Product Component] Delete Admin Product',
  props<{ productId: any; role: string }>()
);
export const deleteManagerProduct = createAction(
  '[Manager Product List Component] Delete Manager Product',
  props<{ productId: any; role: string }>()
);
export const deleteProductSuccess = createAction(
  '[Product Effect] Delete Product Success',
  props<{ product: Product }>()
);
export const deleteProductFailure = createAction(
  '[Product Effect] Delete Product Failure',
  props<{ error: any }>()
);

//**Create Product Review ***//
export const reviewProduct = createAction(
  '[Product View Component] Review Product',
  props<{
    id: any;
    userName: string;
    userId: string;
    rating: number;
    comment: string;
  }>()
);
export const reviewProductSuccess = createAction(
  '[Product Effect] Review Product Success',
  props<{ product: Product }>()
);

export const reviewProductFailure = createAction(
  '[Product Effect] Review Product Failure',
  props<{ error: any }>()
);
