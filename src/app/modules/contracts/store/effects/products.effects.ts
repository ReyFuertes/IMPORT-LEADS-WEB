import { mergeMap, map } from 'rxjs/operators';
import { ProductService, ContractProductService } from './../../services/products.service';
import { addProducts, addProductSuccess } from './../actions/products.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { zip, of } from 'rxjs';

@Injectable()
export class ProductssEffects {
  addProducts$ = createEffect(() => this.actions$.pipe(
    ofType(addProducts),
    mergeMap(({ products, contractProducts }) => {
      return zip(
        this.productsService.post(products),
        this.contractProductService.post(contractProducts),
      ).pipe(
        map(([created]: any[]) => {
          debugger
          return addProductSuccess({ created });
        })
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private productsService: ProductService,
    private contractProductService: ContractProductService
  ) { }
}
