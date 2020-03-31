import { AddEditDialogState } from '../../../../shared/generics/generic.model';
import { GenericAddEditComponent } from '../../../../shared/generics/generic-ae';
import { IContract, IProductImage } from '../../../contracts/contract.model';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddEditState } from 'src/app/shared/generics/generic.model';

@Component({
  selector: 'il-contract-add-dialog',
  templateUrl: './contract-add-dialog.component.html',
  styleUrls: ['./contract-add-dialog.component.scss']
})

export class ContractAddDialogComponent extends GenericAddEditComponent<IContract> implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public contractImages: IProductImage[] = [{
    id: 1,
    name: 'product-img.png'
  }, {
    id: 2,
    name: 'product-img.png'
  }, {
    id: 3,
    name: 'product-img.png'
  }, {
    id: 4,
    name: 'product-img.png'
  }, {
    id: 5,
    name: 'product-img.png'
  }];
  public venues: Array<{ label: string, value?: number | string}> = [
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
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AddEditDialogState) {
    super();
    this.form = this.fb.group({
      id: [''],
      title: [''],
      venue: [''],
      startDate: [null],
      deliveryDate: [null],
      details: [''],
      attachments: [null]
    });
    if (data) {
      this.state = data.state;
      if (this.state === AddEditState.Edit) {
        this.formToEntity(data.formValues);
        this.title = 'Edit ' + data.formValues['title'];
      } else {
        this.title = 'Add ' + data.formValues['title'];
      }
    }
  }

  private formToEntity(contract: IContract): void {
    this.form.controls['id'].patchValue(contract.id);
    this.form.controls['title'].patchValue(contract.title);
    this.form.controls['venue'].patchValue(contract.venue);
    this.form.controls['startDate'].patchValue(contract.startDate);
    this.form.controls['deliveryDate'].patchValue(contract.deliveryDate);
    this.form.controls['details'].patchValue(contract.details);
    this.form.controls['attachments'].patchValue(null);
  }

  ngOnInit() { }

  public onSave(): void {
    this.save(this.form.value as IContract)
      .subscribe(() => this.dialogRef.close(true));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.contractImages, event.previousIndex, event.currentIndex);
  }
}