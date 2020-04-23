import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { environment } from './../../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'iv-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})

export class DatatableComponent extends GenericRowComponent implements OnInit {
  @Input()
  public cols: string[] = [];
  @Input()
  public dataSource: MatTableDataSource<any[]>;
  @Input()
  public pageSizeOptions: number[] = [10, 15, 25, 100];
  private _filter: string;
  @Input()
  public get filter() {
    return this._filter;
  }
  @Output()
  public deleteEmitter = new EventEmitter<any>();
  public set filter(value: string) {
    this._filter = value;
    if (value)
      this.dataSource.filter = value;
  }
  public svgPath: string = environment.svgPath;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.cols.includes('action_col'))
      this.cols.push('action_col');

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onDelete(event: any): void {
    this.deleteEmitter.emit(event);
  }

  public splitToSentCase(str: string): string {
    return str.replace(
      /([-_][a-z])/g,
      (group) => group.toUpperCase()
        .replace('_', ' ')
        .split(/(?=[A-Z])/).join(' '));
  }

  public get displayedCols(): string[] {
    return this.cols.slice(1);
  }
}
