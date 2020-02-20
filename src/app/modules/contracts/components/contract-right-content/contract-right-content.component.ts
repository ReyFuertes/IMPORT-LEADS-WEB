import { BriefDialogComponent } from './../../../dialogs/components/brief/brief-dialog.component';
import { AQLDialogComponent } from './../../../dialogs/components/aql/aql-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'il-contract-right-content',
  templateUrl: './contract-right-content.component.html',
  styleUrls: ['./contract-right-content.component.scss']
})

export class ContractRightContentComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Output()
  public closeEmitter = new EventEmitter<boolean>();
  @ViewChild('scrollPnl', { static: true }) public scrollPnl: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public addBrief(): void {
    const dialogRef = this.dialog.open(BriefDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public addAql(): void {
    const dialogRef = this.dialog.open(AQLDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
