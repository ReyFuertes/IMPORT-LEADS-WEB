import { IProduct } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ProductActionTypes {
  addContractProduct = '[Product] Add',
  addContractProductSuccess = '[Product] Add (success)'
}

export const addContractProducts = createAction(
  ProductActionTypes.addContractProduct,
  props<{ items: IProduct[] }>()
);
export const addContractProductSuccess = createAction(
  ProductActionTypes.addContractProductSuccess,
  props<{ created: IProduct[] }>()
);
