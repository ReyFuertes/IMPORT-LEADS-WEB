import { SimpleItem } from '../../../../shared/generics/generic.model';
import { Component, OnInit } from '@angular/core';
import { VenueProduct, VenuesAddress } from '../../venues.models';
import { VenuesAddDialogComponent } from 'src/app/modules/dialogs/components/venues/venues-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'il-venue-overview-page',
  templateUrl: './venue-overview-page.component.html',
  styleUrls: ['./venue-overview-page.component.scss']
})

export class VenueOverviewPageComponent implements OnInit {
  public isProduct: boolean = true;
  public venuesProduct: VenueProduct[] = [
    {
      id: 1,
      name: 'Canhui toys limited ',
      location: 'GuangZhou',
      relatedProducts: [
        {
          id: 1,
          product: { label: 'Touch Dimmer Switch', value: 'Touch Dimmer Switch' },
          averagePrice: 19,
          avgPassFail: 3,
          quantity: 5000
        },
        {
          id: 1,
          product: { label: 'Touch Dimmer Switch 1G1', value: 'Touch Dimmer Switch 1G1' },
          averagePrice: 15,
          avgPassFail: 3,
          quantity: 1000
        }
      ],
      contracts: 15,
      inspections: 25,
      avgPassFail: 4,
      rating: 5
    },
    {
      id: 2,
      name: 'Dengsheng furniture',
      location: 'Beijing',
      relatedProducts: [
        {
          id: 1,
          product: { label: 'Touch Dimmer Switch', value: 'Touch Dimmer Switch' },
          averagePrice: 19,
          avgPassFail: 3,
          quantity: 5000
        }
      ],
      contracts: 18,
      inspections: 56,
      avgPassFail: 2,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Landy Jewerlry Co.,Ltd',
      location: 'GuangZhou',
      relatedProducts: [
        {
          id: 1,
          product: { label: 'Touch Dimmer Switch', value: 'Touch Dimmer Switch' },
          averagePrice: 19,
          avgPassFail: 3,
          quantity: 5000
        },
        {
          id: 1,
          product: { label: 'Touch Dimmer Switch 1G1', value: 'Touch Dimmer Switch 1G1' },
          averagePrice: 15,
          avgPassFail: 3,
          quantity: 1000
        },
        {
          id: 1,
          product: { label: 'Touch Dimmer 2G2', value: 'Touch Dimmer 2G2' },
          averagePrice: 18,
          avgPassFail: 3,
          quantity: 4000
        }
      ],
      contracts: 24,
      inspections: 145,
      avgPassFail: 3,
      rating: 5
    },
    {
      id: 4,
      name: 'Sankou Electronic Technology',
      location: 'GuangZhou',
      relatedProducts: [
        {
          id: 1,
          product: { label: 'Touch Dimmer Switch', value: 'Touch Dimmer Switch' },
          averagePrice: 19,
          avgPassFail: 3,
          quantity: 5000
        }
      ],
      contracts: 14,
      inspections: 12,
      avgPassFail: 4,
      rating: 3.3
    },
    {
      id: 5,
      name: 'Winyea toys Limited ',
      location: 'Beijing',
      relatedProducts: [
        {
          id: 1,
          product: { label: 'Touch Dimmer Switch', value: 'Touch Dimmer Switch' },
          averagePrice: 19,
          avgPassFail: 3,
          quantity: 5000
        },
        {
          id: 1,
          product: { label: 'Touch Dimmer Switch 1G1', value: 'Touch Dimmer Switch 1G1' },
          averagePrice: 15,
          avgPassFail: 3,
          quantity: 1000
        }
      ],
      contracts: 10,
      inspections: 9,
      avgPassFail: 3,
      rating: 2.8
    }
  ];
  public ctColsProduct: Array<{ label: string, width?: string | number }> = [
    {
      label: 'Venue name',
      width: 20
    },
    {
      label: 'Location',
      width: 10
    },
    {
      label: 'Related products',
      width: 25
    },
    {
      label: 'Contracts',
      width: 8
    },
    {
      label: 'Inspections',
      width: 8
    },
    {
      label: 'Avg. pass/fail',
      width: 8
    },
    {
      label: 'Rating',
      width: 10
    },
    {
      label: '',
    }
  ];

  public venueAddress: VenuesAddress[] = [
    {
      id: 1,
      name: 'Canhui toys limited ',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    },
    {
      id: 2,
      name: 'Dengsheng furniture',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    },
    {
      id: 3,
      name: 'Landy Jewerlry Co.,Ltd',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    },
    {
      id: 4,
      name: 'Sankou Electronic Technology',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    },
    {
      id: 5,
      name: 'Winyea toys Limited ',
      location: 'Haizhu Qu, Guangzhou Shi, Guangdong Sheng Cina',
      contactPerson: 'Tammy Li',
      phone: '+86 10 0000 0000'
    }
  ];

  public ctColsAddress: Array<{ label: string, width?: string | number }> = [
    {
      label: 'Venue name',
      width: 25
    },
    {
      label: 'Location',
      width: 55
    },
    {
      label: 'Phone Number',
      width: 10
    },
    {
      label: 'Contracts',
      width: 10
    },
    {
      label: '',
      width: '35px'
    }
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public onProductClick() {
    this.isProduct = true;
  }

  public onAddressClick() {
    this.isProduct = false;
  }

  public onAddVenues(): void {
    const dialogRef = this.dialog.open(VenuesAddDialogComponent, { data: this.isProduct });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
