import { loadContracts, loadContractSuccess, AddContractSuccess } from './contracts.action';
import { IContract } from './../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ContractsState extends EntityState<IContract> {
  item?: IContract,
  created?: boolean
}
export const contractsAdapter: EntityAdapter<IContract> = createEntityAdapter<IContract>({});
export const initialState: ContractsState = contractsAdapter.getInitialState({
  item: null,
  created: null
});
const contractsReducer = createReducer(
  initialState,
  on(loadContracts, (state) => {
    return ({ ...contractsAdapter.removeAll(state) })
  }),
  on(loadContractSuccess, (state, action) => {
    return ({ ...contractsAdapter.addAll(action.items, state) })
  }),
  on(AddContractSuccess, (state, action) => {
    return ({ ...state, created: action.created })
  })
);
export function ContractsReducer(state: ContractsState, action: Action) {
  return contractsReducer(state, action);
}
export const isCreated = (state: ContractsState) => state.created ? true : false;
export const getItem = (state: ContractsState) => state.item;


