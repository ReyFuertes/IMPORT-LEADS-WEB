import { ITag } from './../tags.model';
import { createAction, props } from '@ngrx/store';

export enum ProductsActionTypes {
  LoadTags = '[Tags] Load',
  LoadTagsSuccess = '[Tags] Load (success)',
}
export const loadTags = createAction(
  ProductsActionTypes.LoadTags
);
export const loadTagsSuccess = createAction(
  ProductsActionTypes.LoadTagsSuccess,
  props<{ items: ITag[] }>()
);
