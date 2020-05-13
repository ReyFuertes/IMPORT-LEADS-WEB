import { ITag } from './../tags.model';
import { createAction, props } from '@ngrx/store';

export enum TagsActionTypes {
  addTag = '[Tags] Add',
  addTagSuccess = '[Tags] Add (success)',
  loadTags = '[Tags] Load',
  loadTagsSuccess = '[Tags] Load (success)',
}
export const addTag = createAction(
  TagsActionTypes.addTag,
  props<{ item: ITag }>()
);
export const addTagSuccess = createAction(
  TagsActionTypes.addTagSuccess,
  props<{ created: ITag }>()
);
export const loadTags = createAction(
  TagsActionTypes.loadTags
);
export const loadTagsSuccess = createAction(
  TagsActionTypes.loadTagsSuccess,
  props<{ items: ITag[] }>()
);
