import { IProduct, IContractProduct, IContract } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ProductActionTypes {
  addProduct = '[Product] Add',
  addProductSuccess = '[Product] Add (success)'
}

export const addProducts = createAction(
  ProductActionTypes.addProduct,
  props<{ payload: IContractProduct }>()
);
export const addProductSuccess = createAction(
  ProductActionTypes.addProductSuccess,
  props<{ created: IContract }>()
);
