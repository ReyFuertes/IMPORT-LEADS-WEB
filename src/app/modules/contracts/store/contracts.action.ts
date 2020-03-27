import { IContract } from './../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ContractActionTypes {
  LoadContracts = '[Contract] Load',
  LoadContractsSuccess = '[Contract] Load (success)',
}
export const loadContracts = createAction(
  ContractActionTypes.LoadContracts,
);
export const loadContractSuccess = createAction(
  ContractActionTypes.LoadContractsSuccess,
  props<{ items: IContract[] }>()
)
