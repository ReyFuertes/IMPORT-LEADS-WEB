import { PillState } from './../../../modules/contracts/contract.model';
import { SimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  @Input()
  public enableHighlight: boolean = false;
  @Input()
  public enabled: boolean = true;
  @Input()
  public state: PillState;
  @Input()
  public size: string = 'medium';
  public selected: boolean = false;
  @Output()
  public removeEmitter = new EventEmitter<number>();
  @Output()
  public stateEmitter = new EventEmitter<PillState>();
  @ViewChild('btn', { static: false }) ev: any;
  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    fromEvent(this.ev.nativeElement, 'dblclick')
      .subscribe((e: any) => { });
  }

  public onHighlightProduct(event: any): void {
    event.preventDefault();
    this.stateEmitter.emit(PillState.reset);
    this.cdRef.detectChanges();
    event.currentTarget.parentNode.classList.add('selected');
  }

  public get isSizeSmall(): boolean {
    return this.size === 'small';
  }
}
