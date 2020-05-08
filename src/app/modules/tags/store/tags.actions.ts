import { ITag } from './../tags.model';
import { createAction, props } from '@ngrx/store';

export enum TagsActionTypes {
  LoadTags = '[Tags] Load',
  LoadTagsSuccess = '[Tags] Load (success)',
}
export const loadTags = createAction(
  TagsActionTypes.LoadTags
);
export const loadTagsSuccess = createAction(
  TagsActionTypes.LoadTagsSuccess,
  props<{ items: ITag[] }>()
);
