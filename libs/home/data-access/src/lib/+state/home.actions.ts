import { createAction, props } from '@ngrx/store';
import { HomeEntity } from './home.models';
export enum homeActionTypes {
loadProductsAction = '[PRODUCTS] Load Products Action',
loadProductsActionSuccess = '[PRODUCTS] Load Products Action Success',
loadProductsActionFailure = '[PRODUCTS] Load Products Action Failure',
}
export const init = createAction('[Home Page] Init');

export const loadHomeSuccess = createAction(
  '[Home/API] Load Home Success',
  props<{ home: HomeEntity[] }>()
);

export const loadHomeFailure = createAction(
  '[Home/API] Load Home Failure',
  props<{ error: any }>()
);

export const loadProducts = createAction(homeActionTypes.loadProductsAction);
export const loadProductsSuccess = createAction(homeActionTypes.loadProductsActionSuccess,props<{products: any}>());
export const loadProductsFailure = createAction(homeActionTypes.loadProductsActionFailure,props<{error: any}>());