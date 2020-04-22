import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-products-sub-list',
  templateUrl: './products-sub-list.component.html',
  styleUrls: ['./products-sub-list.component.scss']
})

export class ProductsSubListComponent extends GenericPanelComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public svgPath: string = environment.svgPath;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;

  constructor() {
    super();
  }

  ngOnInit() { }
}
