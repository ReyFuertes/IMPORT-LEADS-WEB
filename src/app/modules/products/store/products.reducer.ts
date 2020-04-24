import { loadProducts, loadProductsSuccess, addProductSuccess, deleteProductSuccess } from './products.actions';
import { IProduct } from './../products.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { sortCreatedAt } from 'src/app/shared/util/sort';

export interface ProductsState extends EntityState<IProduct> {
}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({});
export const initialState: ProductsState = adapter.getInitialState({

});
const productsReducer = createReducer(
  initialState,
  on(deleteProductSuccess, (state, action) => {
    return adapter.removeOne(action.deleted.id, state)
  }),
  on(addProductSuccess, (state, action) => {
    return adapter.addOne(action.created, state)
  }),
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
  const products = state && state.entities ? Object.values(state.entities) : null;
  return products.sort((a: IProduct, b: IProduct) => sortCreatedAt(a, b));
};
