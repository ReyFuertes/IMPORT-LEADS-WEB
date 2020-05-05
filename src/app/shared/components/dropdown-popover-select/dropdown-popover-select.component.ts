import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-dropdown-popover-select',
  templateUrl: './dropdown-popover-select.component.html',
  styleUrls: ['./dropdown-popover-select.component.scss']
})

export class DropdownPopoverSelectComponent implements OnInit {
  public items: any[] = [
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' }
  ];

  constructor() { }

  ngOnInit() { }
}
