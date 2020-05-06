import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromContracts from '../reducers/category.reducer'

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');

export const getContractCategorySelector = createSelector(
  selectContractModuleState,
  fromContracts.getContractCategory
);
