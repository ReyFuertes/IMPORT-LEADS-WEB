import { SimpleItem } from './../../generics/generic.model';
import { Component, OnInit, Input, ViewChild, ElementRef, Output } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'il-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})

export class InputSelectComponent implements OnInit {
  @Input()
  public suggestions: SimpleItem[];
  @Input()
  public controlName: any;
  @Input()
  public form: FormGroup;
  @Input()
  public placeholder: string = 'Your product here..';
  @Input()
  public isReadOnly: boolean = false;
  public filtered: SimpleItem[] | any[];

  constructor() { }

  ngOnInit() {}

  public filter(event) {
    let query = event.query;
    this.filtered = this.filterArr(query, this.suggestions);
  }

  public filterArr(query, items: any[]): any[] {
    let filtered: any[] = [];
    items && items.forEach((val, i) => {
      if (val.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(val);
      }
    });
    return filtered;
  }
}
