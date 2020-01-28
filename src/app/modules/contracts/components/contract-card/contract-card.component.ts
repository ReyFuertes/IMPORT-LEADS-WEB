import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.scss']
})

export class ContractCardComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  constructor() { }

  ngOnInit() { }
}
