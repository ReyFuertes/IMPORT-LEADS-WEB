import { IProduct, IContractProduct, IContract } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ProductActionTypes {
  addProduct = '[Product] Add',
  addContractProductsSuccess = '[Product] Add (success)',
  deleteContractProduct = '[Product] Delete',
  deleteContractProductSuccess = '[Product] Delete (success)',
}

export const addContractProducts = createAction(
  ProductActionTypes.addProduct,
  props<{ payload: IContractProduct }>()
);
export const addContractProductsSuccess = createAction(
  ProductActionTypes.addContractProductsSuccess,
  props<{ created: IContractProduct }>()
);
export const deleteContractProduct = createAction(
  ProductActionTypes.deleteContractProduct ,
  props<{ id: string }>()
);
