import { SimpleItem } from '../../../../shared/generics/generic.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-venue-overview-page',
  templateUrl: './venue-overview-page.component.html',
  styleUrls: ['./venue-overview-page.component.scss']
})

export class VenueOverviewPageComponent implements OnInit {
  public items: Array<{ id: string | number, name: string, questions?: string[] }> = [
    {
      id: 1,
      name: 'Canhui toys limited '
    },
    {
      id: 2,
      name: 'Dengsheng furniture'
    },
    {
      id: 3,
      name: 'Landy Jewerlry Co.,Ltd'
    },
    {
      id: 4,
      name: 'Sankou Electronic Technology'
    },
    {
      id: 5,
      name: 'Winyea toys Limited '
    }
  ];
  public ctCols: Array<{label: string, width?: string | number}> = [
    {
      label: 'Venue name',
      width: 40
    },
    {
      label: 'Location',
      width: 100
    },
    {
      label: 'Related products',
      width: 20
    },
    {
      label: 'Contracts',
      width: 20
    },
    {
      label: 'Inspections',
      width: 20
    },
    {
      label: 'Avg. pass/fail',
      width: 20
    },
    {
      label: 'Rating',
      width: 20
    }
  ]
  constructor() { }

  ngOnInit() { }
}
