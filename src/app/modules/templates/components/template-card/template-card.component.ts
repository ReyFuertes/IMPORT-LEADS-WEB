import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ContractSelectDialogComponent } from './../../../dialogs/components/contract-select/contract-select-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'il-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss']
})

export class TemplateCardComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public blocked: boolean = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public onMouseout(): void {
    this.blocked = false;
  }

  public onSelectContract() {
    const dialogRef = this.dialog.open(ContractSelectDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // todo
      }
    });
  }
}
