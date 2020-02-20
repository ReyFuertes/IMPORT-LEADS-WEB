import { InspectionPanelModel } from './../../inspections.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-inspection-page',
  templateUrl: './inspection-page.component.html',
  styleUrls: ['./inspection-page.component.scss']
})

export class InspectionPageComponent implements OnInit {
  public items: InspectionPanelModel[] = [
    {
      id: '1',
      title: 'Wood bead bracelet production contract',
      assignedTo: "Rey Fuertes",
      dateRun: '06.10.2019',
      products: [
        {
          label: 'Touch Dimmer Switch',
          value: 'Touch Dimmer Switch'
        }
      ]
    },
    {
      id: '2',
      title: 'Wood bead bracelet inspection (WW)',
      assignedTo: "Tammy Li | CIL China | Procurement officer",
      dateRun: '06.10.2019',
      products: [
        {
          label: 'Touch Dimmer Switch',
          value: 'Touch Dimmer Switch'
        }
      ]
    },
    {
      id: '3',
      title: 'CH EUS20190529',
      assignedTo: "Tammy Li | CIL China | Procurement officer",
      dateRun: '06.10.2019',
      products: [
        {
          label: 'Touch Dimmer Switch',
          value: 'Touch Dimmer Switch'
        }
      ]
    },
    {
      id: '4',
      title: 'ZS-4665 New Square watch',
      assignedTo: "Tammy Li | CIL China | Procurement officer",
      dateRun: '06.10.2019',
      products: [
        {
          label: 'Touch Dimmer Switch',
          value: 'Touch Dimmer Switch'
        }
      ]
    }
  ];
  public ctCols: Array<{label: string, width?: string | number}> = [
    {
      label: 'Contract Name',
      width: 40
    },
    {
      label: 'Assigned to',
      width: 100
    },
    {
      label: 'Desired Run Date',
      width: 20
    }
  ]
  public catCols: Array<{label: string, width?: string | number}> = [
    {
      label: 'Contract Name',
      width: 40
    },
    {
      label: 'Assigned to',
      width: 100
    }
  ]
  constructor() { }

  ngOnInit() { }
}
