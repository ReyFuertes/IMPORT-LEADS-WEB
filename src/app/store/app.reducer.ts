import { NotificationState } from './notification.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { VenuesState, VenuesReducer } from './../modules/venues/store/venues.reducer';
import { ContractsState, ContractsReducer } from './../modules/contracts/store/contracts.reducer';
import { NotificationReducer } from './notification.reducer';

export interface AppState {
  notification?: NotificationState,
  contracts?: ContractsState,
  venues?: VenuesState
}
export const reducers: ActionReducerMap<AppState> = {
  notification: NotificationReducer,
  contracts: ContractsReducer,
  venues: VenuesReducer
};
