import { addProductSuccess } from './../actions/products.action';
import { IProduct, IProductImage } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ProductsState extends EntityState<IProduct> {
}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({});
export const initialState: ProductsState = adapter.getInitialState({
});
const reducer = createReducer(
  initialState,
  on(addProductSuccess, (state, action) => {
    return adapter.addAll(action.created, state)
  })
);
export function ContractProductsReducer(state: ProductsState, action: Action) {
  return reducer(state, action);
}
