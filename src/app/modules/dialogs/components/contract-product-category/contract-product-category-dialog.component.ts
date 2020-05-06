import { environment } from '../../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-contract-product-category-dialog',
  templateUrl: './contract-product-category-dialog.component.html',
  styleUrls: ['./contract-product-category-dialog.component.scss']
})

export class ContractProductCategoryDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractProductCategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  ngOnInit() { }
}
