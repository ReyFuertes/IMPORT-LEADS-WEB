import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {
  @Input()
  public placeholder: string = '';
  constructor() { }

  ngOnInit() { }
}
