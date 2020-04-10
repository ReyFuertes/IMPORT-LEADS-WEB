import { ContractsState } from '../reducers/contract.reducer';
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromContracts from '../reducers/contract.reducer'

export const selectedState = (state: AppState) => state.contracts;
export const getCachedImages = createSelector(
  selectedState,
  fromContracts.getCachedImages
);

export const getAllContracts = createSelector(
  selectedState,
  fromContracts.getAllContracts
);

export const getContractById = (id: string) => createSelector(
  selectedState,
  (state: ContractsState) => state.entities[id]
);
