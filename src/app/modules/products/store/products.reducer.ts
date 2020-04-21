import { loadProducts, loadProductsSuccess } from './products.actions';
import { IProduct } from './../products.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ProductsState extends EntityState<IProduct> {
}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({});
export const initialState: ProductsState = adapter.getInitialState({

});
const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => {
    return ({ ...adapter.removeAll(state) })
  }),
  on(loadProductsSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function ProductsReducer(state: ProductsState, action: Action) {
  return productsReducer(state, action);
}
export const getProducts = (state: ProductsState) => {
  return state && state.entities ? Object.values(state.entities) : null;
};


