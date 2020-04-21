import { IProduct } from './../products.model';
import { createAction, props } from '@ngrx/store';

export enum ProductsActionTypes {
  LoadProducts = '[Products] Load',
  LoadProductsSuccess = '[Products] Load (success)',
}
export const loadProducts = createAction(
  ProductsActionTypes.LoadProducts
);
export const loadProductsSuccess = createAction(
  ProductsActionTypes.LoadProductsSuccess,
  props<{ items: IProduct[] }>()
);
