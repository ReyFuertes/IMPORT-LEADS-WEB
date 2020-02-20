import { Contract } from './../../../contracts/contract.model';
import { environment } from './../../../../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'il-contract-add-dialog',
  templateUrl: './contract-add-dialog.component.html',
  styleUrls: ['./contract-add-dialog.component.scss']
})

export class ContractAddDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      id: [''],
      title: [''],
      venue: [''],
      startDate: [null],
      deliveryDate: [null],
      details: [''],
      attachments: [null]
    });
    if (data)
      this.formToEntity(data['formValues'] as Contract);
  }

  private formToEntity(contract: Contract): void {
    this.form.controls['id'].patchValue(contract.id);
    this.form.controls['title'].patchValue(contract.title);
    this.form.controls['venue'].patchValue(contract.venue);
    this.form.controls['startDate'].patchValue(contract.startDate);
    this.form.controls['deliveryDate'].patchValue(contract.deliveryDate);
    this.form.controls['details'].patchValue(contract.details);
    this.form.controls['attachments'].patchValue(null);
  }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
