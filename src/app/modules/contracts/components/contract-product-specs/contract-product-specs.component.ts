import { ContractSpecTitleDialogComponent } from './../../../dialogs/components/contract-spec-title/contract-spec-title-dialog.component';
import { ContractProductSpecDialogComponent } from './../../../dialogs/components/contract-product-spec/contract-product-spec-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

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
  public tabTitle: string = 'General Design and Specification';
  @Input()
  public specTitle: string = 'Specification title';

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public add(): void {
    this.panels.push({ id: 4, title: 'test title 123', description: 'test description 123' });
  }

  public addTitle(): void {
    const dialogRef = this.dialog.open(ContractSpecTitleDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.specTitle = result;
      console.log('The dialog was closed', result);
    });
  }

  public UpdateProductSpecTitle(): void {
    const dialogRef = this.dialog.open(ContractProductSpecDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
