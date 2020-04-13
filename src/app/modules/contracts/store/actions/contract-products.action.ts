import { IProduct } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ProductActionTypes {
  addContractProduct = '[Product] Add',
  addContractProductSuccess = '[Product] Add (success)'
}

export const addContractProduct = createAction(
  ProductActionTypes.addContractProduct,
  props<{ item: IProduct }>()
);
export const addContractProductSuccess = createAction(
  ProductActionTypes.addContractProductSuccess,
  props<{ created: IProduct }>()
);
