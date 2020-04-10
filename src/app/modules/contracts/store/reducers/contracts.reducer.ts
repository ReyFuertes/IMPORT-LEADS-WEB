import { loadContracts, loadContractSuccess, addContractSuccess, cacheImages, clearCachedImages, updateContractSuccess } from '../actions/contracts.action';
import { IContract, IProductImage } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ContractsState extends EntityState<IContract> {
  item?: IContract,
  created?: boolean,
  cachedImages: IProductImage[]
}
export const contractsAdapter: EntityAdapter<IContract> = createEntityAdapter<IContract>({
  sortComparer: (a: IContract, b: IContract) => {
    if (a.created_at < b.created_at) return 1;
    if (a.created_at > b.created_at) return -1;
    return 0;
  }
});
export const initialState: ContractsState = contractsAdapter.getInitialState({
  item: null,
  created: null,
  cachedImages: null
});
const contractsReducer = createReducer(
  initialState,
  on(loadContracts, (state) => {
    return ({ ...contractsAdapter.removeAll(state) });
  }),
  on(updateContractSuccess, (state, action) => {
    return contractsAdapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(addContractSuccess, (state, action) => {
    return contractsAdapter.addOne(action.created, state)
  }),
  on(loadContractSuccess, (state, action) => {
    return ({ ...contractsAdapter.addAll(action.items, state) })
  }),
  on(cacheImages, (state, action) => {
    return ({ ...state, cachedImages: action.images })
  }),
  on(clearCachedImages, (state) => {
    return ({ ...state, cachedImages: null })
  })
);
export function ContractsReducer(state: ContractsState, action: Action) {
  return contractsReducer(state, action);
}

export const getCachedImages = (state: ContractsState) => state.cachedImages;
export const getAllContracts = (state: ContractsState) => {
  const contracts: IContract[] = state && state.entities ? Object.values(state.entities) : null;
  return contracts.sort((a: IContract, b: IContract) => {
    if (a.created_at < b.created_at) return 1;
    if (a.created_at > b.created_at) return -1;
    return 0;
  });
};
