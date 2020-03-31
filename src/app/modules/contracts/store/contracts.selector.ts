import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromContracts from './contracts.reducer'

export const selectedState = (state: AppState) => state.contracts;
export const isContractCreated = createSelector(
  selectedState,
  fromContracts.isCreated
);
