import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-venue-expansion-list',
  templateUrl: './venue-expansion-list.component.html',
  styleUrls: ['./venue-expansion-list.component.scss']
})

export class VenueExpansionListComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public questions: string[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  constructor() { }

  ngOnInit() { }

  public onClose(): void {
    setTimeout(() => {
      this.selectedIndex = null;
    }, 100);
  }

  public mouseout(): void {
    this.hoveredIndex = null;
    this.selectedIndex = null;
  }

  public onHover(i: number) {
    this.hoveredIndex = i;
  }
}
