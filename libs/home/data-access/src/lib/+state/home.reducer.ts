import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as HomeActions from './home.actions';
import { HomeEntity } from './home.models';

export const HOME_FEATURE_KEY = 'home';

export interface State extends EntityState<HomeEntity> {
  selectedId?: string | number; // which Home record has been selected
  loaded: boolean; // has the Home list been loaded
  error?: string | null; // last known error (if any)

  products: any,
  productsIsLoaded: boolean,
  productsIsLoading: boolean,
}

export interface HomePartialState {
  readonly [HOME_FEATURE_KEY]: State;
}

export const homeAdapter: EntityAdapter<HomeEntity> =
  createEntityAdapter<HomeEntity>();

export const initialState: State = homeAdapter.getInitialState({
  // set initial required properties
  loaded: false,

  products: [],
  productsIsLoaded: false,
  productsIsLoading: false,
});

const homeReducer = createReducer(
  initialState,
  on(HomeActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(HomeActions.loadHomeSuccess, (state, { home }) =>
    homeAdapter.setAll(home, { ...state, loaded: true })
  ),
  on(HomeActions.loadHomeFailure, (state, { error }) => ({ ...state, error })),
  on(HomeActions.loadProducts, (state, action) => {
    return {
      ...state,
      productsIsLoaded: false,
      productsIsLoading: true,
    }
  }),
  on(HomeActions.loadProductsSuccess, (state, { products}) => {
    return {
      ...state,
      productsIsLoaded: true,
      productsIsLoading: false,
      products: products
    }
  }),
  on(HomeActions.loadProductsFailure, (state, { error }) => {
    return {
      ...state,
      productsIsLoaded: false,
      productsIsLoading: false,
      error,
    }
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return homeReducer(state, action);
}
