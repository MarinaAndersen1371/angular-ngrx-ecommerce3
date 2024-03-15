import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductService } from 'src/app/modules/products/resources/product.service';
import * as ProductActions from 'src/app/modules/products/state/product.actions';

@Injectable()
export class ProductAdminEffects {
  loadAdminProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ProductActions.loadAdminProducts,
        ProductActions.loadManagerProducts
      ),
      mergeMap((action) =>
        this.productService.getAdminProducts(action.role).pipe(
          map(({ products, topProducts, statistics }) =>
            ProductActions.loadProductsSuccess({
              products,
              topProducts,
              statistics,
            })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  loadAdminProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.loadAdminProduct,
        ProductActions.loadManagerProduct
      ),
      mergeMap((action) =>
        this.productService.getAdminProduct(action.id, action.role).pipe(
          map((product) => ProductActions.loadProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error: error }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addAdminProduct, ProductActions.addManagerProduct),
      concatMap((action) =>
        this.productService
          .createProduct(
            action.name,
            action.brand,
            action.category,
            action.description,
            action.pricePurchase,
            action.price,
            action.quantity,
            action.extra,
            action.imageUrl,
            action.modifiedBy
          )
          .pipe(
            map((product) => ProductActions.addProductSuccess({ product })),
            catchError((error) =>
              of(ProductActions.addProductFailure({ error: error }))
            )
          )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.updateAdminProduct,
        ProductActions.updateManagerProduct
      ),
      mergeMap((action) =>
        this.productService
          .updateProduct(
            action.id,
            action.name,
            action.brand,
            action.category,
            action.description,
            action.pricePurchase,
            action.price,
            action.quantity,
            action.extra,
            action.imageUrl,
            action.modifiedBy
          )
          .pipe(
            map((product) => ProductActions.updateProductSuccess({ product })),
            catchError((error) =>
              of(ProductActions.updateProductFailure({ error }))
            )
          )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.deleteAdminProduct,
        ProductActions.deleteManagerProduct
      ),
      mergeMap((action) =>
        this.productService.removeProduct(action.productId, action.role).pipe(
          map((product) => ProductActions.deleteProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
