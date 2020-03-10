import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';

@Component({
  selector: 'il-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {
  @Input()
  public placeholder: string = '';
  @Input()
  public controlName: FormControlName;
  @Input()
  public form: FormGroup;
  constructor() { }

  ngOnInit() {}
}
