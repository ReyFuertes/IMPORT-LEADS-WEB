import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'}
];

@Component({
  selector: 'il-products-sub-list',
  templateUrl: './products-sub-list.component.html',
  styleUrls: ['./products-sub-list.component.scss']
})

export class ProductsSubListComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = ELEMENT_DATA;
  public svgPath: string = environment.svgPath;

  constructor() { }

  ngOnInit() { }
}
