import { IContractProduct } from './../../contract.model';
import { addContractSuccess } from './../actions/contracts.action';
import { mergeMap, map } from 'rxjs/operators';
import { ProductService, ContractProductService } from './../../services/products.service';
import { addContractProducts, addContractProductsSuccess, deleteContractProduct } from './../actions/products.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { zip, of } from 'rxjs';

@Injectable()
export class ProductssEffects {
  addContractProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addContractProducts),
    mergeMap(({ payload }) =>
      this.contractProductService.post(payload)
        .pipe(
          map((created: any) => {
            return addContractSuccess({ created });
          })
        ))
  ));

  deleteContractProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractProduct),
    mergeMap(({ id }) =>
      this.contractProductService.delete(id)
    )), { dispatch: false });

  constructor(
    private actions$: Actions,
    private contractProductService: ContractProductService
  ) { }
}
