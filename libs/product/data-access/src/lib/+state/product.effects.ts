import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ProductActions from './product.actions';
import * as ProductFeature from './product.reducer';
import { ProductService } from '../product.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ProductActions.loadProductSuccess({ product: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ProductActions.loadProductFailure({ error });
        },
      })
    )
  );

  loadProductDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProductDetails),
      mergeMap((action) =>
        this.productService.getProductDetails(action.productId).pipe(
          map((data) => ProductActions.loadProductDetailsSuccess({productDetails: data})
          ),
          catchError(err => of(ProductActions.loadProductDetailsFailure({error: err})))
        )
      )
    )
  });

  constructor(private readonly actions$: Actions, private productService: ProductService) {}
}
