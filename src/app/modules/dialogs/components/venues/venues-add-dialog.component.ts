import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimpleItem} from 'src/app/shared/generics/generic.model';

@Component({
  selector: 'il-venues-add-dialog',
  templateUrl: './venues-add-dialog.component.html',
  styleUrls: ['./venues-add-dialog.component.scss']
})
export class VenuesAddDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public isProduct: boolean;
  public headerLabel: string;
  public products: SimpleItem[];
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<VenuesAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {
      this.isProduct = data;
      if (this.isProduct) {
        this.headerLabel = 'Product';
        this.form = this.fb.group({
          id: [''],
          name: [''],
          location: [''],
          relatedProducts: [null],
          contracts: [null],
          inspections: [null],
          avgPassFail: [null],
          rating: [null],
        });
      } else {
        this.headerLabel = 'Address';
        this.form = this.fb.group({
          id: [''],
          name: [''],
          location: [''],
          contactPerson: [null],
          phone: [null],
        });
      }
    }

  ngOnInit() {
  }

  public onSelectProduct() {
    this.products.push({
      label: this.form.value.name,
      value: this.form.value.id
    });
  }

}
