import { environment } from './../../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-contract-product-spec-dialog',
  templateUrl: './contract-product-spec-dialog.component.html',
  styleUrls: ['./contract-product-spec-dialog.component.scss']
})

export class ContractProductSpecDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractProductSpecDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      title: ['']
    });
  }

  ngOnInit() { }
}
