import { Component, OnInit, Input } from '@angular/core';
import { InsightVenue } from '../../performance-insights.models';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'il-performance-insights-venue',
  templateUrl: './performance-insights-venue.component.html',
  styleUrls: ['./performance-insights-venue.component.scss']
})
export class PerformanceInsightsVenueComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: InsightVenue[];
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number, icon?: string }>;
  constructor() { }

  ngOnInit() {
  }

}
