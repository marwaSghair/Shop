import { createAction, props } from '@ngrx/store';
import { ProductEntity } from './product.models';
export enum productDetailsActionTypes {
  loadProductDetailsAction = '[PRODUCTDETAILS] Load Product Details Action',
  loadProductDetailsActionSuccess = '[PRODUCTDETAILS] Load Product Details Action Success',
  loadProductDetailsActionFailure = '[PRODUCTDETAILS] Load Product Details Action Failure',
  }
export const init = createAction('[Product Page] Init');

export const loadProductSuccess = createAction(
  '[Product/API] Load Product Success',
  props<{ product: ProductEntity[] }>()
);

export const loadProductFailure = createAction(
  '[Product/API] Load Product Failure',
  props<{ error: any }>()
);
export const loadProductDetails = createAction(productDetailsActionTypes.loadProductDetailsAction,props<{productId: string}>());
export const loadProductDetailsSuccess = createAction(productDetailsActionTypes.loadProductDetailsActionSuccess,props<{productDetails: any}>());
export const loadProductDetailsFailure = createAction(productDetailsActionTypes.loadProductDetailsActionFailure,props<{error: any}>());