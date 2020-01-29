import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})

export class PillComponent implements OnInit {
  @Input()
  public label: string;
  public svgPath: string = environment.svgPath;
  constructor() { }

  ngOnInit() { }
}
