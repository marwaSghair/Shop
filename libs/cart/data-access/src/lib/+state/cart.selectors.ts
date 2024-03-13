import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CART_FEATURE_KEY, State, cartAdapter } from './cart.reducer';

// Lookup the 'Cart' feature state managed by NgRx
export const getCartState = createFeatureSelector<State>(CART_FEATURE_KEY);

const { selectAll, selectEntities } = cartAdapter.getSelectors();

export const getCartLoaded = createSelector(
  getCartState,
  (state: State) => state.loaded
);

export const getCartError = createSelector(
  getCartState,
  (state: State) => state.error
);

export const getAllCart = createSelector(getCartState, (state: State) =>
  selectAll(state)
);

export const getCartEntities = createSelector(getCartState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getCartState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCartEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
export const getCart = createSelector(
  getCartState,
  (state: State) => state.cart
)
export const getCount = createSelector(
  getCartState,
  (state: State) => state.count
)
export const getCartIsLoaded = createSelector(
  getCartState,
  (state: State) => state.cartIsLoaded
)
