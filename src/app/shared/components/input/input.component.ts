import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';

@Component({
  selector: 'il-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {
  @Input()
  public placeholder: string;
  @Input()
  public controlName: FormControlName;
  @Input()
  public form: FormGroup;

  constructor() { }

  ngOnInit() { }
}
