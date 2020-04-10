import { IProduct } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ContractActionTypes {
  addProduct = '[Product] Add',
  addProductSuccess = '[Product] Add (success)'
}

export const addContract = createAction(
  ContractActionTypes.addProduct,
);
export const addContractSuccess = createAction(
  ContractActionTypes.addProductSuccess,
  props<{ item: IProduct[] }>()
);
