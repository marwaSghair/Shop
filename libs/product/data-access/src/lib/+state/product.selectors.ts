import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCT_FEATURE_KEY, State, productAdapter } from './product.reducer';

// Lookup the 'Product' feature state managed by NgRx
export const getProductState =
  createFeatureSelector<State>(PRODUCT_FEATURE_KEY);

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const getProductLoaded = createSelector(
  getProductState,
  (state: State) => state.loaded
);

export const getProductError = createSelector(
  getProductState,
  (state: State) => state.error
);

export const getAllProduct = createSelector(getProductState, (state: State) =>
  selectAll(state)
);

export const getProductEntities = createSelector(
  getProductState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProductState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getProductEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
export const getProductDetails = createSelector(
  getProductState,
  (state: State) => state.productDetails
)
export const getProductsIsLoaded = createSelector(
  getProductState,
  (state: State) => state.productDetailsIsLoaded
)
