import { IContractCategory } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addContractCategory = '[Contract Category] Add',
  addContractCategorySuccess = '[Contract Category] Add (success)',
}

export const addContractCategory = createAction(
  CategoryActionTypes.addContractCategory,
  props<{ payload: IContractCategory }>()
);
export const addContractCategorySuccess = createAction(
  CategoryActionTypes.addContractCategorySuccess,
  props<{ created: IContractCategory }>()
);
