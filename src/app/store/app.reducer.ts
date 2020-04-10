import { ContractProductsState } from './../modules/contracts/store/reducers/contract-products.reducer';
import { NotificationState } from './notification.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { VenuesState, VenuesReducer } from './../modules/venues/store/venues.reducer';
import { ContractsState, ContractsReducer } from './../modules/contracts/store/reducers/contract.reducer';
import { NotificationReducer } from './notification.reducer';
import { ContractProductsReducer } from '../modules/contracts/store/reducers/contract-products.reducer';

export interface AppState {
  notification?: NotificationState,
  contracts?: ContractsState,
  contractProducts: ContractProductsState
  venues?: VenuesState
}
export const reducers: ActionReducerMap<AppState> = {
  notification: NotificationReducer,
  contracts: ContractsReducer,
  contractProducts: ContractProductsReducer,
  venues: VenuesReducer
};
