import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, OnChanges, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { MatSelect, MatOption, MatSelectChange } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

import * as _ from 'lodash';

@Component({
  selector: 'il-dropdown-multi-select',
  templateUrl: './dropdown-multi-select.component.html',
  styleUrls: ['./dropdown-multi-select.component.scss']
})
export class DropdownMultiSelectComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {
  @Input()
  public placeHolder: string = '';
  @Input()
  public multiSelectDropdown: boolean = false;
  @Input()
  public searchItem: boolean = false;
  @Input()
  public isRequired: boolean = false;
  @Input()
  public dataList: any[] = [];
  @Input()
  public clearOption: Observable<void>;
  @Input()
  public addItem: any;
  @Input()
  public removeItem: any;
  @Input()
  public errorMessage: string;
  @Input()
  public validate: boolean;
  @Input()
  public selectItem: any;
  @Output()
  public selectItemChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('multiSelect', { static: false }) multiSelect: MatSelect;
  @ViewChild('submitBtn', { static: false }) submitBtn: ElementRef<HTMLElement>;

  public form: FormGroup;
  public dataFilterForm: FormControl = new FormControl();
  public filteredData$: ReplaySubject<any> = new ReplaySubject<any>();
  private newDataList: any;
  protected _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.fb.group({
      formSelectedItem: [null, (this.isRequired) ? [Validators.compose([Validators.required])] : []]
    });

    this.newDataList = this.dataList.slice();
    this.filteredData$.next(this.newDataList);

    this.dataFilterForm.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.filterdata();
      });

    if (this.clearOption) {
      this.clearOption.subscribe(() => {
        if (this.multiSelectDropdown) {
          this.multiSelect.options.forEach((option: MatOption) => {
            option.deselect();
          });
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addItem && changes.addItem.currentValue) {
      this.addNewItem(changes.addItem.currentValue);
    }

    if (changes.removeItem && changes.removeItem.currentValue) {
      this.removeSelectedItem(changes.removeItem.currentValue);
    }

    if (changes.validate && changes.validate.currentValue && this.form && this.form.invalid) {
      this.submitBtn.nativeElement.click();
    }

    if (changes.selectItem && changes.selectItem.currentValue) {
      this.selectItems(changes.selectItem.currentValue);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public onSelect(event: MatSelectChange): void {
    this.selectItemChange.emit(event);
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

  private addNewItem(item: any): void {
    if (item) {
      this.newDataList.push(item);

      this.filteredData$.next(this.newDataList);

      setTimeout(() => {
        this.multiSelect.options.forEach((option: MatOption) => {
          if (option && option.value) {
            if (item.key === option.value.key) {
              option.select();
            }
          }
        });
      });
    }
  }

  private selectItems(items: any[]): void {
    if (typeof(items) === 'number') {
      items = [{ key: items }];
    }

    setTimeout(() => {
      this.multiSelect.options.forEach((option: MatOption) => {
        if (option && option.value) {
          if (items.some((item) => item.key === option.value.key)) {
            option.select();
          }
        }
      });
    });
  }

  private removeSelectedItem(item: any): void {
    if (item) {
      this.multiSelect.options.forEach((option: MatOption) => {
        if (option && option.value) {
          if (item.key === option.value.key) {
            option.deselect();
          }
        }
      });
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
