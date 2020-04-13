import { mergeMap, map } from 'rxjs/operators';
import { ContractProductsService } from './../../services/contract-products.service';
import { addContractProducts, addContractProductSuccess } from './../actions/contract-products.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class ContractProductssEffects {
  addContractProducts$ = createEffect(() => this.actions$.pipe(
    ofType(addContractProducts),
    mergeMap(({ items }) => {
      return this.contractProductsService.post(items)
        .pipe(
          map((created: any) => {
            return addContractProductSuccess({ created });
          })
        )
    })
  ));

  constructor(
    private actions$: Actions,
    private contractProductsService: ContractProductsService,
  ) { }
}
