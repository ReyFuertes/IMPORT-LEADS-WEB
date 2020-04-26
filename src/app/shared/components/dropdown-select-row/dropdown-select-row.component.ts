import { SimpleItem } from './../../generics/generic.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-dropdown-select-row',
  templateUrl: './dropdown-select-row.component.html',
  styleUrls: ['./dropdown-select-row.component.scss']
})

export class DropdownSelectRowComponent implements OnInit {
  @Input()
  public options: SimpleItem[];
  @Input()
  public selectedItem: any;
  @Input()
  public placeholder: string;
  constructor() {

  }

  ngOnInit() {

  }
}
