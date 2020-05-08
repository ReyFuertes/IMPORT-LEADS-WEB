import { ICategory } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addCategory = '[Category] Add',
  addCategorySuccess = '[Category] Add (success)',
}

export const addCategory = createAction(
  CategoryActionTypes.addCategory,
  props<{ payload: ICategory }>()
);
export const addCategorySuccess = createAction(
  CategoryActionTypes.addCategorySuccess,
  props<{ created: ICategory }>()
);
