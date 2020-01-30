import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})

export class TextareaComponent implements OnInit {
  @Input()
  public value: string;
  constructor() { }

  ngOnInit() { }
}
