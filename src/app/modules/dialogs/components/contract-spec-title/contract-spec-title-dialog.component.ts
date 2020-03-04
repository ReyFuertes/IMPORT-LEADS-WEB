import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-contract-spec-title-dialog',
  templateUrl: './contract-spec-title-dialog.component.html',
  styleUrls: ['./contract-spec-title-dialog.component.scss']
})

export class ContractSpecTitleDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractSpecTitleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      title: [null, Validators.required],
    }); }

  ngOnInit() { }
}
