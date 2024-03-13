import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { CartEntity } from './cart.models';

export const CART_FEATURE_KEY = 'cart';

export interface State extends EntityState<CartEntity> {
  selectedId?: string | number; // which Cart record has been selected
  loaded: boolean; // has the Cart list been loaded
  error?: string | null; // last known error (if any)

  cart: any,
  cartIsLoaded: boolean,
  cartIsLoading: boolean,
  count: number;
}

export interface CartPartialState {
  readonly [CART_FEATURE_KEY]: State;
}

export const cartAdapter: EntityAdapter<CartEntity> =
  createEntityAdapter<CartEntity>();

export const initialState: State = cartAdapter.getInitialState({
  // set initial required properties
  loaded: false,

  cart: [],
  cartIsLoaded: false,
  cartIsLoading: false,
  count: 1
});

const cartReducer = createReducer(
  initialState,
  on(CartActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(CartActions.loadCartSuccess, (state, { cart }) =>
    cartAdapter.setAll(cart, { ...state, loaded: true })
  ),
  on(CartActions.loadCartFailure, (state, { error }) => ({ ...state, error })),
  on(CartActions.loadShopCart, (state, action) => {
    return {
      ...state,
      cartIsLoaded: false,
      cartIsLoading: true,
    }
  }),
  on(CartActions.loadShopCartSuccess, (state, action) => {
    const products = [...state.cart];
    const existingItem = products.find(
      (i) => i.id === action.cart.id
    );
    if (existingItem) {
      // Increment quantity if item already exists
      state = {...state, count: state.count + 1}
    } else {
      // Add the new item if it doesn't exist
      state = {
        ...state,
        cart: [...state.cart, action.cart]
      }
    }
    return state;
  }),
  on(CartActions.removeItemFromCart, (state, action) => {
    const products = [...state.cart];
    const index = products.findIndex(x => x.id === action.cart.id);
    products.splice(index, 1);
    state = {
      ...state,
      cart: products
    }
    return state;
  }),
  on(CartActions.incrementCount, (state) => {
    state = {...state, count: state.count + 1}
    return state;
  }),
  on(CartActions.decrementCount, (state) => {
    state = {...state, count: state.count - 1}
    return state;
  }),
  on(CartActions.loadShopCartFailure, (state, { error }) => {
    return {
      ...state,
      cartIsLoaded: false,
      cartIsLoading: false,
      error,
    }
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return cartReducer(state, action);
}
