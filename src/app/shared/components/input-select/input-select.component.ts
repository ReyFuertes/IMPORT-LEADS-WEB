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
  public suggestions: Array<{ label: string, value: string }> = [
    {
      label: 'Product 1',
      value: '1'
    },
    {
      label: 'Product 2',
      value: '2'
    },
    {
      label: 'Product 3',
      value: '3'
    },
    {
      label: 'Product 4',
      value: '4'
    },
    {
      label: 'Product 5',
      value: '5'
    }
  ];
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

  ngOnInit() { }

  public filter(event) {
    let query = event.query;
    this.filtered = this.filterArr(query, this.suggestions);
  }

  public filterArr(query, items: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < items.length; i++) {
      let country = items[i];
      if (country.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }
}
