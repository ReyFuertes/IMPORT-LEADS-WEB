import { IProduct } from './../../contract.model';
import { ContractProductsService } from './../../services/contract-products.service';
import { addContractProduct, addContractProductSuccess } from './../actions/contract-products.action';
import { AppState } from './../../../../store/app.reducer';
import { ContractsService } from './../../services/contracts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class ContractProductssEffects {
  addContractProducts$ = createEffect(() => this.actions$.pipe(
    ofType(addContractProduct),
    // mergeMap(({ item }) => this.contractProductsService.post(item)
    // .pipe(
    //   map((created: IProduct) => {
    //     return updateContractSuccess({ created });
    //   })
    // ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractProductsService: ContractProductsService,
  ) { }
}
