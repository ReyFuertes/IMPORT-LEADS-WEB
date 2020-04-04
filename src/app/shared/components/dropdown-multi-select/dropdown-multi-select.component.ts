import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, OnChanges, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { MatSelect, MatOption, MatSelectChange } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';

import * as _ from 'lodash';

@Component({
  selector: 'il-dropdown-multi-select',
  templateUrl: './dropdown-multi-select.component.html',
  styleUrls: ['./dropdown-multi-select.component.scss']
})
export class DropdownMultiSelectComponent implements OnInit, OnDestroy {
  @Input()
  public form: FormGroup;
  @Input()
  public placeHolder: string = '';
  @Input()
  public searchItem: boolean = false;
  @Input()
  public dataList: any[] = [];
  @Input()
  public controlName: FormControlName;
  @Output()
  public valueEmitter = new EventEmitter<any>();

  public dataFilterForm: FormControl = new FormControl();
  public filteredData$: ReplaySubject<any> = new ReplaySubject<any>();
  private newDataList: any;
  protected _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.newDataList = this.dataList.slice();
    this.filteredData$.next(this.newDataList);
    this.dataFilterForm.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.filterdata();
      });

    //manually mark as valid if has value
    this.form.get('venue').valueChanges.pipe(take(1)).subscribe(res => {
      if (res)
        this.form.controls['venue'].setErrors(null);
    })
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
  public onSelect(event: MatSelectChange): void {
    this.valueEmitter.emit(event);
  }
  public onSubmitAttempt(): void {
    this.form.markAsTouched();
  }
  private filterdata(): void {
    let search: string = this.dataFilterForm.value;

    if (!search) {
      this.filteredData$.next(this.newDataList);
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredData$.next(
      this.newDataList.filter(data => data.label.toLowerCase().indexOf(search) > -1)
    );
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
