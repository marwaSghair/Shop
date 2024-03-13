import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ProductActions from './product.actions';
import { ProductEntity } from './product.models';

export const PRODUCT_FEATURE_KEY = 'product';

export interface State extends EntityState<ProductEntity> {
  selectedId?: string | number; // which Product record has been selected
  loaded: boolean; // has the Product list been loaded
  error?: string | null; // last known error (if any)

  productDetails: any,
  productDetailsIsLoaded: boolean,
  productDetailsIsLoading: boolean,
}

export interface ProductPartialState {
  readonly [PRODUCT_FEATURE_KEY]: State;
}

export const productAdapter: EntityAdapter<ProductEntity> =
  createEntityAdapter<ProductEntity>();

export const initialState: State = productAdapter.getInitialState({
  // set initial required properties
  loaded: false,

  productDetails: [],
  productDetailsIsLoaded: false,
  productDetailsIsLoading: false,
});

const productReducer = createReducer(
  initialState,
  on(ProductActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProductActions.loadProductSuccess, (state, { product }) =>
    productAdapter.setAll(product, { ...state, loaded: true })
  ),
  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProductActions.loadProductDetails, (state, action) => {
    return {
      ...state,
      productDetailsIsLoaded: false,
      productDetailsIsLoading: true,
    }
  }),
  on(ProductActions.loadProductDetailsSuccess, (state, action) => {
    return {
      ...state,
      productDetailsIsLoaded: true,
      productDetailsIsLoading: false,
      productDetails: action.productDetails
    }
  }),
  on(ProductActions.loadProductDetailsFailure, (state, { error }) => {
    return {
      ...state,
      productDetailsIsLoaded: false,
      productDetailsIsLoading: false,
      error,
    }
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
