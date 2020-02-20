import { SimpleItem } from '../../../../shared/generics/generic.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-venue-expansion-panel',
  templateUrl: './venue-expansion-panel.component.html',
  styleUrls: ['./venue-expansion-panel.component.scss']
})

export class VenueExpansionPanelComponent extends GenericPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: Array<{ id: string, name: string, questions?: string[] }>;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;
  constructor() {
    super();
  }

  ngOnInit() { }
}
