import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'il-contract-product-specs-title',
  templateUrl: './contract-product-specs-title.component.html',
  styleUrls: ['./contract-product-specs-title.component.scss']
})
export class ContractProductSpecsTitleComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public specification: { id: number, title: string };
  @Output()
  public removeSpecTitleEmitter = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  public onRemoveTitle(id: number): void {
    this.removeSpecTitleEmitter.emit(id);
  }
}
