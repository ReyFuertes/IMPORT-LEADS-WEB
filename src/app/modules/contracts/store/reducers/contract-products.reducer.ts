import { addContractProductSuccess } from './../actions/contract-products.action';
import { IProduct, IProductImage } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ContractProductsState extends EntityState<IProduct> {
}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({});
export const initialState: ContractProductsState = adapter.getInitialState({
});
const reducer = createReducer(
  initialState,
  on(addContractProductSuccess, (state, action) => {
    return adapter.addOne(action.created, state)
  })
);
export function ContractProductsReducer(state: ContractProductsState, action: Action) {
  return reducer(state, action);
}
