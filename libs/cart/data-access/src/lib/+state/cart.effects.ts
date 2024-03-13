import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CartActions from './cart.actions';
import * as CartFeature from './cart.reducer';
import { CartService } from '../cart.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CartEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CartActions.loadCartSuccess({ cart: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return CartActions.loadCartFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private cartService: CartService) {}
}
