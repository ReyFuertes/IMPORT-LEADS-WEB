import { addContractProduct, addContractProductSuccess } from './../actions/contract-products.action';
import { ImagesService } from './../../../../services/images.service';
import { appNotification } from './../../../../store/notification.action';
import { AppState } from './../../../../store/app.reducer';
import { UploadService } from './../../../../services/upload.service';
import { IContract } from './../../contract.model';
import { ContractsService } from './../../contracts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class ContractProductssEffects {
  addContract$ = createEffect(() => this.actions$.pipe(
    ofType(addContractProduct),

  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractsService: ContractsService,
  ) { }
}
