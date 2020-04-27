import { SimpleItem } from './../../generics/generic.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'il-dropdown-select-row',
  templateUrl: './dropdown-select-row.component.html',
  styleUrls: ['./dropdown-select-row.component.scss']
})

export class DropdownSelectRowComponent implements OnInit {
  @Input()
  public items: SimpleItem[];
  @Input()
  public selectedItem: any;
  @Input()
  public placeholder: string;
  constructor() {

  }
  @Output()
  public valueEmitter = new EventEmitter<SimpleItem>();
  public options: any;
  ngOnInit() {
    this.options = this.items;
    console.log('selectedItem', this.selectedItem);
  }
}
