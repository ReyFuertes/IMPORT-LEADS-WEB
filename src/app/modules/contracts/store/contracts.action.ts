import { QueryParam } from './../../../models/generic..model';
import { IContract, ICachedImage } from './../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ContractActionTypes {
  LoadContracts = '[Contract] Load',
  LoadContractsSuccess = '[Contract] Load (success)',
  AddContract = '[Contract] Add',
  AddContractSuccess = '[Contract] Add (success)',
  UploadImage = '[Contract] Upload',
  UploadImageSuccess = '[Contract] Upload (success)',
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
  props<{ item: IContract, file?: any }>()
);
export const AddContractSuccess = createAction(
  ContractActionTypes.AddContractSuccess,
  props<{ created: boolean }>()
);
export const uploadContractImage = createAction(
  ContractActionTypes.UploadImage,
  props<{ file: any }>()
);
export const uploadContractImageSuccess = createAction(
  ContractActionTypes.UploadImageSuccess,
  props<{ Image?: boolean }>()
);
export const cacheImages = createAction(
  ContractActionTypes.UploadImageSuccess,
  props<{ images: ICachedImage[] }>()
);
