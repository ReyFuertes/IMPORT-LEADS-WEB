import { SimpleItem } from 'src/app/shared/generics/generic.model';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownSelect } from './../../generics/generic.model';

@Component({
  selector: 'il-popover-select',
  templateUrl: './popover-select.component.html',
  styleUrls: ['./popover-select.component.scss']
})
export class PopoverSelectComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public selectedItem: SimpleItem;
  @Input()
  public options: SimpleItem[];
  @Output()
  public selectedEmitter = new EventEmitter<SimpleItem>();

  constructor() { }

  ngOnInit() { }

}
