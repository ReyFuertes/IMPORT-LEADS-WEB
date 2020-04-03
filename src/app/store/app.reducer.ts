import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { VenuesState, VenuesReducer } from './../modules/venues/store/venues.reducer';
import { ContractsState, ContractsReducer } from './../modules/contracts/store/contracts.reducer';
import { ModuleWithProviders } from '@angular/core';

export interface AppState {
  contracts?: ContractsState,
  venues?: VenuesState
}
export const reducers: ActionReducerMap<AppState> = {
  contracts: ContractsReducer,
  venues: VenuesReducer
};
