import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOME_FEATURE_KEY, State, homeAdapter } from './home.reducer';

// Lookup the 'Home' feature state managed by NgRx
export const getHomeState = createFeatureSelector<State>(HOME_FEATURE_KEY);

const { selectAll, selectEntities } = homeAdapter.getSelectors();

export const getHomeLoaded = createSelector(
  getHomeState,
  (state: State) => state.loaded
);

export const getHomeError = createSelector(
  getHomeState,
  (state: State) => state.error
);

export const getAllHome = createSelector(getHomeState, (state: State) =>
  selectAll(state)
);

export const getHomeEntities = createSelector(getHomeState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getHomeState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getHomeEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getProducts = createSelector(
  getHomeState,
  (state: State) => state.products
)
export const getProductsIsLoaded = createSelector(
  getHomeState,
  (state: State) => state.productsIsLoaded
)