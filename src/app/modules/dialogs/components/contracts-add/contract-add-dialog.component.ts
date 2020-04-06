import { appNotification } from './../../../../store/notification.action';
import { getVenuesSelector } from './../../../venues/store/venues.selector';
import { SimpleItem } from './../../../../shared/generics/generic.model';
import { take, switchMap, tap, debounceTime, concatMap, delay } from 'rxjs/operators';
import { Observable, from, of, forkJoin } from 'rxjs';
import { uploadContractImage, cacheImages } from './../../../contracts/store/contracts.action';
import { IImage } from './../../../../models/image.model';
import { getCachedImages } from './../../../contracts/store/contracts.selector';
import { AppState } from './../../../../store/app.reducer';
import { AddEditDialogState } from '../../../../shared/generics/generic.model';
import { GenericAddEditComponent } from '../../../../shared/generics/generic-ae';
import { IContract, IProductImage, ICachedImage } from '../../../contracts/contract.model';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public venues: SimpleItem[];
  public title: string = 'Add';
  public images: ICachedImage[] = [];
  public cachedImages: ICachedImage[];
  public files: File[] = [];

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<ContractAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditDialogState, private store: Store<AppState>) {
    super();
    this.form = this.fb.group({
      id: [null],
      contract_name: [null, Validators.required],
      venue: [null, Validators.required],
      start_date: [null, Validators.required],
      delivery_date: [null],
      details: [null]
    });
    //manually mark as valid if has value
    this.form && this.form.get('venue').valueChanges.pipe(take(1)).subscribe(res => {
      if (res) this.form.controls['venue'].setErrors(null);
    })

    if (data) {
      this.state = data.state;
      if (this.state === AddEditState.Edit) {
        this.formToEntity(data.formValues);
        this.title = 'Edit ' + data.formValues['contract_name'];
      } else this.title = 'Add ' + data.formValues['contract_name'];
    }
  }

  private formToEntity(item: IContract): void {
    this.form.controls['id'].patchValue(item.id);
    this.form.controls['contract_name'].patchValue(item.contract_name);
    this.form.controls['venue'].patchValue(item.venue);
    this.form.controls['start_date'].patchValue(item.start_date);
    this.form.controls['delivery_date'].patchValue(item.delivery_date);
    this.form.controls['details'].patchValue(item.details);
    this.form.controls['attachments'].patchValue(null);
  }
  ngOnInit() {
    this.store.pipe(select(getCachedImages))
      .subscribe(result => this.cachedImages = result);

    this.store.pipe(select(getVenuesSelector)).subscribe(venues => {
      this.venues = <SimpleItem[]>venues.map(venue => Object.assign([],
        { label: venue.name, value: venue.id }));
    });
  }

  public save = (item: IContract): void => {
    //venues and images
    const { label, value } = this.form.get('venue').value;
    item.venue = { id: value, name: label };
    item.images = this.cachedImages && this.cachedImages.map(ci => {
      return { id: ci.id, filename: ci.filename }
    }) || [];

    //create contract
    this.store.dispatch(AddContract({ item }));
    //and upload images
    this.files && from(this.files).pipe(
      concatMap(item => of(item).pipe(delay(500))),
    ).subscribe(file => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.store.dispatch(uploadContractImage({ file: formData }));
    })
    this.dialogRef.close(true);
  }

  public onNoClick = (): void => this.dialogRef.close();
  public drop = (event: CdkDragDrop<any[]>) => moveItemInArray(this.cachedImages, event.previousIndex, event.currentIndex);
  public onRemoveCachedImage(image: ICachedImage): void {
    const index: number = this.cachedImages.indexOf(image);
    if (index !== -1) {
      this.cachedImages.splice(index, 1);
      this.store.dispatch(cacheImages({ images: this.cachedImages }));
    }
  }
  public onImageChange(event: File): void {
    this.files.push(event);
    //collect all drop images in base64 results
    const $result = this.convertBlobToBase64(event)
      .pipe(
        take(1),
        tap(b64Result => this.images.push({ id: uuid(), image: b64Result, filename: event.name })),
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
}
