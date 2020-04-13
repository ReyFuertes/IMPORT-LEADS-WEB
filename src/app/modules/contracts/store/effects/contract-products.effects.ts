import { mergeMap, map } from 'rxjs/operators';
import { ContractProductsService } from './../../services/contract-products.service';
import { addContractProduct, addContractProductSuccess } from './../actions/contract-products.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class ContractProductssEffects {
  addContractProducts$ = createEffect(() => this.actions$.pipe(
    ofType(addContractProduct),
    mergeMap(({ item }) => this.contractProductsService.post(item)
    .pipe(
      map((created: any) => {
        return addContractProductSuccess({ created });
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private contractProductsService: ContractProductsService,
  ) { }
}
