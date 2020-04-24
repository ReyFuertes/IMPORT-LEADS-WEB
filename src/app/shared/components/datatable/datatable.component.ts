import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { environment } from './../../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'iv-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})

export class DatatableComponent extends GenericRowComponent implements OnInit, AfterViewInit {
  @Input()
  public cols: string[] = [];
  @Input()
  public data: any[];
  @Input()
  public pageSizeOptions: number[] = [10, 15, 25, 100];
  @Output()
  public deleteEmitter = new EventEmitter<any>();
  public svgPath: string = environment.svgPath;
  public dataSource: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    if (!this.cols.includes('action_col'))
      this.cols.push('action_col');
  }

  ngAfterViewInit(): void {
    if (this.data && this.data.length > 0) {
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.cdRef.detectChanges();
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
