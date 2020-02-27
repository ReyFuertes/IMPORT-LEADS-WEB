import { SimpleItem } from '../../../../shared/generics/generic.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';
import { VenuesProduct, RelatedProduct } from '../../venues.models';

@Component({
  selector: 'il-venue-expansion-panel',
  templateUrl: './venue-expansion-panel.component.html',
  styleUrls: ['./venue-expansion-panel.component.scss']
})

export class VenueExpansionPanelComponent extends GenericPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: VenuesProduct[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;
  public rates = new Array(5);
  @Input()
  public isProduct: boolean;

  public ctColsRelatedProduct: Array<{label: string, width?: string | number}> = [
    {
      label: '',
      width: 30
    },
    {
      label: 'Configured products',
      width: 35
    },
    {
      label: 'Avg. Price',
      width: 10
    },
    {
      label: 'Avg. pass/fail',
      width: 10
    },
    {
      label: 'Qnt. of items',
      width: 10
    }
  ];

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor() {
    super();
  }

  ngOnInit() { }

  public getToolTip(product: RelatedProduct[]): string {
    let tooltip = '';
    for (const entry of product) {
      tooltip = tooltip + entry.product.label + '\n';
    }
    return tooltip;
  }

  public onPreventExpandPanel(event: any) {
    event.stopPropagation();
  }

}
