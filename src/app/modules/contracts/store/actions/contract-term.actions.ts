import { IContractTerm } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum TermActionTypes {
  addContractTerm = '[Contract Term] Add',
  addContractTermSuccess = '[Contract Term] Add (success)',
  loadContractTerm = '[Contract Term] Load]',
  loadContractTermSuccess = '[Contract Term] Load (success)'
}
export const addContractTerm = createAction(
  TermActionTypes.addContractTerm,
  props<{ payload: IContractTerm }>()
);
export const addContractTermSuccess = createAction(
  TermActionTypes.addContractTermSuccess,
  props<{ created: IContractTerm }>()
);
