import { SimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})

export class DropdownSelectComponent extends GenericControl<SimpleItem> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() { }
}
