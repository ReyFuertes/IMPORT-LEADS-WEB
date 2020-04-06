import { appNotification } from './../../../store/notification.action';
import { AppState } from './../../../store/app.reducer';
import { UploadService } from './../../../services/upload.service';
import { IContract } from './../contract.model';
import { ContractsService } from './../contracts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { loadContracts, loadContractSuccess, AddContract, AddContractSuccess, uploadContractImage, uploadContractImageSuccess } from './contracts.action';
import { Store } from '@ngrx/store';

@Injectable()
export class ContractsEffects {
  addContract$ = createEffect(() => this.actions$.pipe(
    ofType(AddContract),
    mergeMap(({ item }) => this.contractsService.post(item)
      .pipe(
        map((created: IContract) => {
          if (created) this.store.dispatch(appNotification({ success: true }));
          return AddContractSuccess({ created });
        })
      ))
  ));
  loadContracts$ = createEffect(() => this.actions$.pipe(
    ofType(loadContracts),
    mergeMap(({ queryParam }) => this.contractsService.getAll(queryParam).pipe(
      map((items: IContract[]) => {
        return loadContractSuccess({ items });
      })
    ))
  ));
  uploadImage$ = createEffect(() => this.actions$.pipe(
    ofType(uploadContractImage),
    mergeMap(({ file }) => this.uploadService.upload(file, 'single').pipe(
      map((file: any) => {
        return uploadContractImageSuccess({});
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractsService: ContractsService,
    private uploadService: UploadService
  ) { }
}
