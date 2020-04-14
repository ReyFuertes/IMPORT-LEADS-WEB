import { NotificationState } from './notification.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { VenuesState, VenuesReducer } from './../modules/venues/store/venues.reducer';
import { ContractsState, ContractsReducer } from './../modules/contracts/store/reducers/contract.reducer';
import { NotificationReducer } from './notification.reducer';

export interface AppState {
  notification?: NotificationState,
  venues?: VenuesState
}
export const reducers: ActionReducerMap<AppState> = {
  notification: NotificationReducer,
  venues: VenuesReducer
};
