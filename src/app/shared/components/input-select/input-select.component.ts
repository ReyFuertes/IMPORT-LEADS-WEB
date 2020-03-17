import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  public items: Array<{ label: string, value: string }> = [
    {
      label: 'Product 1',
      value: '1'
    },
    {
      label: 'zxc 2',
      value: '2'
    },
    {
      label: 'bnm 3',
      value: '3'
    },
    {
      label: '67876',
      value: '4'
    },
    {
      label: 'SFDF',
      value: '5'
    }
  ];
  @Input()
  public controlName: any;
  @Input()
  public form: FormGroup;
  @Input()
  public isReadOnly: boolean = false;
  @Input()
  public isRequired: boolean = false;
  public searchedItems: Observable<any[]>;

  constructor() { }

  ngOnInit() {
    this.searchedItems = this.controlName && this.form.get(this.controlName) && this.form.get(this.controlName).valueChanges
      .pipe(
        startWith(''),
        map(item => item ? this._filterStates(item) : this.items.slice())
      );
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(state => state.label.toLowerCase().indexOf(filterValue) === 0);
  }
}
