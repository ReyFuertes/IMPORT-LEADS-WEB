import { addContractSuccess } from './../actions/contracts.action';
import { mergeMap, map } from 'rxjs/operators';
import { ProductService, ContractProductService } from './../../services/products.service';
import { addProducts, addProductSuccess } from './../actions/products.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { zip, of } from 'rxjs';

@Injectable()
export class ProductssEffects {
  addReturnContracts$ = createEffect(() => this.actions$.pipe(
    ofType(addProducts),
    mergeMap(({ payload }) =>
      this.contractProductService.post(payload)
        .pipe(
          map((created: any) => {
            return addContractSuccess({ created });
          })
        ))
  ));

  constructor(
    private actions$: Actions,
    private productsService: ProductService,
    private contractProductService: ContractProductService
  ) { }
}
