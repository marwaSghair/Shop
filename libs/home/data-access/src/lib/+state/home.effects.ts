import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as HomeActions from './home.actions';
import * as HomeFeature from './home.reducer';
import { HomeService } from '../home.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class HomeEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return HomeActions.loadHomeSuccess({ home: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return HomeActions.loadHomeFailure({ error });
        },
      })
    )
  );

  loadProductlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeActions.loadProducts),
      mergeMap((action) =>
        this.homeService.getProducts().pipe(
          map((data) => HomeActions.loadProductsSuccess({products: data})
          ),
          catchError(err => of(HomeActions.loadProductsFailure({error: err})))
        )
      )
    )
  });

  constructor(private readonly actions$: Actions, private homeService: HomeService) {}
}
