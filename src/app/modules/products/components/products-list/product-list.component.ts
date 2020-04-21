import { IRelatedProduct } from '../../../venues/venues.models';
import { IProduct } from '../../../contracts/contract.model';
import { SimpleItem } from '../../../../shared/generics/generic.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent extends GenericPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public dragStart: boolean = false;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;

  @Input()
  public products: IProduct[];
  @Input()
  public cols: Array<{ label: string, width?: string | number }>;

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor() {
    super();
  }

  ngOnInit() { }

  public dragStarted = (event: any) => this.dragStart = event;

  public getToolTip(product: IRelatedProduct[]): string {
    let tooltip = '';
    for (const entry of product) {
      tooltip = tooltip + entry.product.label + '\n';
    }
    return tooltip;
  }
}
