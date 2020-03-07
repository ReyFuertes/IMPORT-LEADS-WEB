import { ContractAddDialogComponent } from 'src/app/modules/dialogs/components/contracts/contract-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-contract-overview-page',
  templateUrl: './contract-overview-page.component.html',
  styleUrls: ['./contract-overview-page.component.scss']
})

export class ContractOverviewPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public addContract(): void {
    const dialogRef = this.dialog.open(ContractAddDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => { });
  }
}
