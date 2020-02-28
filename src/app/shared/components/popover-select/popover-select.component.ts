import { Component, OnInit, Input } from '@angular/core';
import { DropdownSelect } from './../../generics/generic.model';

@Component({
  selector: 'il-popover-select',
  templateUrl: './popover-select.component.html',
  styleUrls: ['./popover-select.component.scss']
})
export class PopoverSelectComponent implements OnInit {

  @Input()
  public options: DropdownSelect[];

  @Input()
  public multiSelect: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public onSelectOption(option: DropdownSelect) {
    console.log(option);
  }

}
