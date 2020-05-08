import { addContractCategory, addContractCategorySuccess } from './../actions/contract-category.action';
import { ContractCategoryService } from './../../services/contract-category.service';
import { AppState } from './../../../../store/app.reducer';
import { IContractCategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class ContractCategoryEffects {
  addCategory$ = createEffect(() => this.actions$.pipe(
    ofType(addContractCategory),
    mergeMap(({ payload }) => this.contractCategoryService.post(payload)
      .pipe(
        map((created: IContractCategory) => {
          return addContractCategorySuccess({ created });
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractCategoryService: ContractCategoryService,
  ) { }
}
