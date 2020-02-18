import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss']
})

export class TemplateCardComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public blocked: boolean = false;
  constructor() { }

  ngOnInit() { }

  public onMouseout(): void {
    this.blocked = false;
  }
}
