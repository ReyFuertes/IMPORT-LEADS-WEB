import { InspectionCommentDialogComponent } from './../../../dialogs/components/inspection-comments/inspection-comments-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  conditions: string;
  position: number;
  verification: Array<{ label: string, value: boolean }>;
  remarks: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1, conditions: 'All parts shall be in color and materials as shown in the quotation.',
    verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
    remarks: ''
  },
  {
    position: 2, conditions: 'No bad physical condition.',
    verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
    remarks: ''
  },
  {
    position: 3, conditions: 'No damages, cracks or scratches.',
    verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
    remarks: ''
  },
  {
    position: 4, conditions: 'No bad physical condition.',
    verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
    remarks: ''
  },
  {
    position: 5, conditions: 'No damages, cracks or scratches.',
    verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
    remarks: ''
  },
];
@Component({
  selector: 'il-inspection-quality-requirement',
  templateUrl: './inspection-quality-requirement.component.html',
  styleUrls: ['./inspection-quality-requirement.component.scss']
})

export class InspectionQualityRequirementComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'conditions', 'verification', 'remarks'];
  public dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public onRemarks(): void {
    const dialogRef = this.dialog.open(InspectionCommentDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => { });
  }
}
