import { loadContracts, loadContractSuccess, AddContractSuccess, cacheImages } from './contracts.action';
import { IContract, ICachedImages } from './../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ContractsState extends EntityState<IContract> {
  item?: IContract,
  created?: boolean,
  cachedImages: ICachedImages[]
}
export const contractsAdapter: EntityAdapter<IContract> = createEntityAdapter<IContract>({});
export const initialState: ContractsState = contractsAdapter.getInitialState({
  item: null,
  created: null,
  cachedImages: null
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
  }),
  on(cacheImages, (state, action) => {
    return ({ ...state, cachedImages: action.images })
  })
);
export function ContractsReducer(state: ContractsState, action: Action) {
  return contractsReducer(state, action);
}
export const isCreated = (state: ContractsState) => state.created ? true : false;
export const getCachedImages = (state: ContractsState) =>  state.cachedImages;
export const getItem = (state: ContractsState) => state.item;


