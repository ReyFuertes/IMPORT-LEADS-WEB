import { Component, OnInit, Input } from '@angular/core';
import { RelatedProduct } from '../../venues.models';

@Component({
  selector: 'il-venue-expansion-list',
  templateUrl: './venue-expansion-list.component.html',
  styleUrls: ['./venue-expansion-list.component.scss']
})

export class VenueExpansionListComponent implements OnInit {
  @Input()
  public items: RelatedProduct[];
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;
  constructor() { }

  ngOnInit() { }

}
