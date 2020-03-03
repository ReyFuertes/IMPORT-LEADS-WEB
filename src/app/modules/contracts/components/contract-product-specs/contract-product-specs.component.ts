import { ContractProductSpecDialogComponent } from './../../../dialogs/components/contract-product-spec/contract-product-spec-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-contract-product-specs',
  templateUrl: './contract-product-specs.component.html',
  styleUrls: ['./contract-product-specs.component.scss']
})

export class ContractProductSpecsComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public _showTabActions: boolean = false;
  public panels: Array<{ id: number, title: string, description: string }> = [
    {
      id: 1,
      title: '2G1W Dimmer Picture',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      id: 2,
      title: 'Rated Voltage',
      description: '<500W'
    },
    {
      id: 3,
      title: 'Ive seen other answers suggesting animating',
      description: 'Start editing to see some magic happen :).'
    },
    {
      id: 4,
      title: 'In case anyone is reading this',
      description: 'transition '
    }
  ];
  public specTitle: string = 'General Design and Specification';
  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public add(): void {
    this.panels.push({ id: 4, title: 'test title 123', description: 'test description 123' });
  }

  public UpdateProductSpecTitle(): void {
    const dialogRef = this.dialog.open(ContractProductSpecDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
