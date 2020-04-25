import { Observable } from 'rxjs';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { environment } from './../../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'iv-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})

export class DatatableComponent extends GenericRowComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  public cols: string[] = [];
  @Input()
  public data: any[];
  @Input()
  public dialogIndex: number = 1;
  @Input()
  public colFunc: () => void;
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
      this.setData(this.data);
    }
    this.cdRef.detectChanges();
  }

  public onTriggerFunc = (): void => this.colFunc();

  public isColFunc(el: any, i: number): boolean {
    return el && this.dialogIndex === i;
  }

  public isLastElement(arr: any[], i: number): boolean {
    return (arr.length - 1) === i;
  }

  private setData(data: any): void {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data && changes.data.currentValue) {
      this.setData(changes.data.currentValue);
    }
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
