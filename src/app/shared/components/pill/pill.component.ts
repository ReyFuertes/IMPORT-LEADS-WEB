import { SimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'il-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})

export class PillComponent extends GenericControl<SimpleItem> implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public selectable: boolean = false;
  @Output()
  public removeEmitter = new EventEmitter<number>();
  @Input()
  public enableHighlight: boolean = false;
  constructor() {
    super();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    fromEvent(this.ev.nativeElement, 'dblclick')
      .subscribe((e: any) => console.log('double click', e.nativeElement));
  }

  @ViewChild('btn', { static: false }) ev: any;
  public onHighlightProduct(event: any): void {
    if (this.enableHighlight === false ) {
      return;
    }
    const products = Array.from(document.querySelectorAll('.il-pill'));
    const classes = event.target.parentElement.classList.value;
    if (classes.indexOf('selected') !== -1) {
      event.target.parentElement.classList.remove('selected');
    } else {
      event.target.parentElement.classList.add('selected');
    }
  }
}
