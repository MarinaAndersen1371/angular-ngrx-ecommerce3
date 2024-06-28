import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductService } from 'src/app/modules/products/resources/product.service';
import * as ProductActions from 'src/app/modules/products/state/product.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts, ProductActions.loadFranchiseProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
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

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct, ProductActions.loadFranchiseProduct),
      mergeMap((action) =>
        this.productService.getProduct(action.id).pipe(
          map((product) => ProductActions.loadProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error: error }))
          )
        )
      )
    )
  );

  reviewProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.reviewProduct),
      concatMap((action) =>
        this.productService
          .reviewProduct(
            action.id,
            action.userName,
            action.userId,
            action.rating,
            action.comment
          )
          .pipe(
            map((product) => ProductActions.reviewProductSuccess({ product })),
            catchError((error) =>
              of(ProductActions.reviewProductFailure({ error: error }))
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
