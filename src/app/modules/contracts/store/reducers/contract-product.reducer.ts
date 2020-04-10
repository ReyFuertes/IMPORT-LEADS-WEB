import { addProductSuccess } from './../actions/contract-product.action';
import { IProduct, IProductImage } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ProductProductsState extends EntityState<IProduct> {
}
export const productAdapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  sortComparer: (a: IProduct, b: IProduct) => {
    if (a.created_at < b.created_at) return 1;
    if (a.created_at > b.created_at) return -1;
    return 0;
  }
});
export const initialState: ProductProductsState = productAdapter.getInitialState({
});
const productsReducer = createReducer(
  initialState,
  // on(loadProducts, (state) => {
  //   return ({ ...productAdapter.removeAll(state) });
  // }),
  on(addProductSuccess, (state, action) => {
    return productAdapter.addOne(action.item, state)
  })
);
export function ProductsReducer(state: ProductProductsState, action: Action) {
  return productsReducer(state, action);
}
