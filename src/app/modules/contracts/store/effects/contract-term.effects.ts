import { ContractTermService } from './../../services/contract-term.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addContractTerm, addContractTermSuccess } from '../actions/contract-term.actions';

@Injectable()
export class ContractTermEffects {
  add$ = createEffect(() => this.actions$.pipe(
    ofType(addContractTerm),
    mergeMap(({ payload }) => this.contractTermService.post(payload)
      .pipe(
        map((created: any) => {

          return addContractTermSuccess({ created });
        })
      ))
  ));

  constructor(
    private actions$: Actions,
    private contractTermService: ContractTermService,
  ) { }
}
