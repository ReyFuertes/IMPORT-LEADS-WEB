import { IContract } from './../contract.model';
import { ContractsService } from './../contracts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { loadContracts, loadContractSuccess, AddContract, AddContractSuccess } from './contracts.action';
import { of } from 'rxjs';

@Injectable()
export class ContractsEffects {
  addContract$ = createEffect(() => this.actions$.pipe(
    ofType(AddContract),
    mergeMap(({ item }) => this.contractsService.post(item).pipe(
      tap(),
      map((created: any) => {
        return AddContractSuccess({ created });
      })
    ))
  ));
  loadContracts$ = createEffect(() => this.actions$.pipe(
    ofType(loadContracts),
    mergeMap(() => this.contractsService.get().pipe(
      map((items: IContract[]) => {
        return loadContractSuccess({items});
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private contractsService: ContractsService
  ) { }
}
