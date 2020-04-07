import { QueryParam } from './../../../models/generic..model';
import { IContract, IProductImage } from './../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ContractActionTypes {
  LoadContracts = '[Contract] Load',
  LoadContractsSuccess = '[Contract] Load (success)',
  AddContract = '[Contract] Add',
  AddContractSuccess = '[Contract] Add (success)',
  UploadImages = '[Contract] Upload Images',
  UploadImagesSuccess = '[Contract] Upload Images (success)',
  ReorderImages = '[Contract] Reorder Images',
}
export const loadContracts = createAction(
  ContractActionTypes.LoadContracts,
  props<{ queryParam: QueryParam }>()
);
export const loadContractSuccess = createAction(
  ContractActionTypes.LoadContractsSuccess,
  props<{ items: IContract[] }>()
);
export const AddContract = createAction(
  ContractActionTypes.AddContract,
  props<{ item: IContract }>()
);
export const AddContractSuccess = createAction(
  ContractActionTypes.AddContractSuccess,
  props<{ created: IContract }>()
);
export const uploadContractImages = createAction(
  ContractActionTypes.UploadImages,
  props<{ files: any }>()
);
export const uploadContractImageSuccess = createAction(
  ContractActionTypes.UploadImagesSuccess,
  props<{ Image?: boolean }>()
);
export const cacheImages = createAction(
  ContractActionTypes.UploadImagesSuccess,
  props<{ images: IProductImage[] }>()
);
export const ReOrderImages = createAction(
  ContractActionTypes.ReorderImages,
  props<{ images: IProductImage[] }>()
);
