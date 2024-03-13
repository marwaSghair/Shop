import { createAction, props } from '@ngrx/store';
import { CartEntity } from './cart.models';
export enum cartActionTypes {
  loadCartAction = '[CART] Load Cart Action',
  loadCartActionSuccess = '[CART] Load Cart Action Success',
  removeItemFromCart = '[CART] Remove Item from Cart',
  loadCartActionFailure = '[CART] Load Cart Action Failure',
  incrementAction = '[CART] increment a number',
  decrementAction = '[CART] decrement a number',
  }
export const init = createAction('[Cart Page] Init');

export const loadCartSuccess = createAction(
  '[Cart/API] Load Cart Success',
  props<{ cart: CartEntity[] }>()
);

export const loadCartFailure = createAction(
  '[Cart/API] Load Cart Failure',
  props<{ error: any }>()
);
export const loadShopCart = createAction(cartActionTypes.loadCartAction);
export const loadShopCartSuccess = createAction(cartActionTypes.loadCartActionSuccess,props<{cart: any}>());
export const removeItemFromCart = createAction(cartActionTypes.removeItemFromCart,props<{cart: any}>());
export const incrementCount = createAction(cartActionTypes.incrementAction);
export const decrementCount = createAction(cartActionTypes.decrementAction);
export const loadShopCartFailure = createAction(cartActionTypes.loadCartActionFailure,props<{error: any}>());