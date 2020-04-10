import { IProduct } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ProductActionTypes {
  addProduct = '[Product] Add',
  addProductSuccess = '[Product] Add (success)'
}

export const addProduct = createAction(
  ProductActionTypes.addProduct,
  props<{ item: IProduct }>()
);
export const addProductSuccess = createAction(
  ProductActionTypes.addProductSuccess,
  props<{ item: IProduct }>()
);
