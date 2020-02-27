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
  public selectedItems: SimpleItem[] = [];
  public items: SimpleItem[] = [
    {
      label: 'Product 1',
      value: '1'
    },
    {
      label: 'zxc 2',
      value: '2'
    },
    {
      label: 'bnm 3',
      value: '3'
    },
    {
      label: '67876',
      value: '4'
    },
    {
      label: 'SFDF',
      value: '5'
    }
  ];
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


  public handleSelectChange(event: any): void {
    event.value.forEach(item => {
        this.selectedItems.push(item);
    });

    this.selectedItems = this.selectedItems.filter((thing, i, arr) => {
      return arr.indexOf(arr.find(t => t.value === thing.value)) === i;
    });
  }

  public onRemove(value: string): void {
    this.selectedItems = this.selectedItems.filter(item => item.value !== value);
  }

}
