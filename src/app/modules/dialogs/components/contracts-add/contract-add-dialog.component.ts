import { take, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { uploadContractImage, cacheImages } from './../../../contracts/store/contracts.action';
import { IImage } from './../../../../models/image.model';
import { isCreated, ContractsState } from './../../../contracts/store/contracts.reducer';
import { isContractCreated, getCachedImages } from './../../../contracts/store/contracts.selector';
import { AppState } from './../../../../store/app.reducer';
import { ContractsService } from './../../../contracts/contracts.service';
import { AddEditDialogState } from '../../../../shared/generics/generic.model';
import { GenericAddEditComponent } from '../../../../shared/generics/generic-ae';
import { IContract, IProductImage, ICachedImages } from '../../../contracts/contract.model';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddEditState } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import { AddContract } from 'src/app/modules/contracts/store/contracts.action';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'il-contract-add-dialog',
  templateUrl: './contract-add-dialog.component.html',
  styleUrls: ['./contract-add-dialog.component.scss']
})

export class ContractAddDialogComponent extends GenericAddEditComponent<IContract> implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public contractImages: IImage[];
  public venues: Array<{ label: string, value?: number | string }> = [
    {
      label: 'Canhui toys limited',
      value: 1
    },
    {
      label: 'Canhui toys limited 2',
      value: 2
    },
    {
      label: 'Canhui toys limited 3',
      value: 3
    }
  ];
  public title: string = 'Add';
  public images: ICachedImages[] = [];
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditDialogState,
    private store: Store<AppState>) {
    super();
    this.form = this.fb.group({
      id: [null],
      contract_name: ['Test Contract'],
      venue: [''],
      start_date: [null],
      delivery_date: [null],
      details: ['Contrary to popular belief, Lorem Ipsum is not simply random text'],
      attachments: [null]
    });
    if (data) {
      this.state = data.state;
      if (this.state === AddEditState.Edit) {
        this.formToEntity(data.formValues);
        this.title = 'Edit ' + data.formValues['contract_name'];
      } else {
        this.title = 'Add ' + data.formValues['contract_name'];
      }
    }
  }

  private formToEntity(contract: IContract): void {
    this.form.controls['id'].patchValue(contract.id);
    this.form.controls['contract_name'].patchValue(contract.name);
    this.form.controls['venue'].patchValue(contract.venue);
    this.form.controls['start_date'].patchValue(contract.start_date);
    this.form.controls['delivery_date'].patchValue(contract.delivery_date);
    this.form.controls['details'].patchValue(contract.details);
    this.form.controls['attachments'].patchValue(null);
  }
  public cachedImages: ICachedImages[];
  ngOnInit() {
    this.store.pipe(select(getCachedImages)).subscribe(result => this.cachedImages = result);
    this.store.pipe(select(getCachedImages)).subscribe(res => console.log(res));
  }

  public onImageChange(event: File): void {
    const formData = new FormData();
    formData.append('file', event, event.name);

    //collect all drop images in base64 results
    const $result = this.convertBlobToBase64(event).pipe(
      take(1),
      tap(b64Result => this.images.push({ id: uuid(), image: b64Result })),
      switchMap(() => this.store.pipe(take(1), select(getCachedImages))));
    $result.pipe(
      tap(res => this.images.concat(res)))
      .subscribe(() => {
        this.store.dispatch(cacheImages({ images: this.images }));
      })
  }

  public convertBlobToBase64(blob: Blob): Observable<{}> {
    const fileReader = new FileReader();
    const observable = new Observable(observer => {
      fileReader.onloadend = () => {
        observer.next(fileReader.result);
        observer.complete();
      };
    });
    fileReader.readAsDataURL(blob);
    return observable;
  }

  public onValueChange(event: any): void { }

  public save = (contract: IContract): void => {
    this.store.dispatch(AddContract({ item: contract }));
    this.store.pipe(select(isContractCreated))
      .subscribe(isCreated => this.dialogRef.close(isCreated));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.cachedImages, event.previousIndex, event.currentIndex);
  }
}
