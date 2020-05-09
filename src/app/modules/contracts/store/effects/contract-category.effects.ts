import { addContractCategory, addContractCategorySuccess, loadContractCategory, loadContractCategorySuccess } from './../actions/contract-category.action';
import { ContractCategoryService } from './../../services/contract-category.service';
import { AppState } from './../../../../store/app.reducer';
import { IContractCategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class ContractCategoryEffects {
  loadContractCategory$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractCategory),
    mergeMap(({ id }) => this.contractCategoryService.getById(id, 'contract').pipe(
      map((items: IContractCategory[]) => {
        return loadContractCategorySuccess({ items });
      })
    ))
  ));

  addContractCategory$ = createEffect(() => this.actions$.pipe(
    ofType(addContractCategory),
    mergeMap(({ payload }) => this.contractCategoryService.post(payload)
      .pipe(
        map((created: IContractCategory) => {
          return addContractCategorySuccess({ created });
        })
      ))
  ));

  constructor(
    private actions$: Actions,
    private contractCategoryService: ContractCategoryService,
  ) { }
}
