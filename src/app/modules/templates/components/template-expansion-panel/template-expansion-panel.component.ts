import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-template-expansion-panel',
  templateUrl: './template-expansion-panel.component.html',
  styleUrls: ['./template-expansion-panel.component.scss']
})

export class TemplateExpansionPanelComponent extends GenericPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: Array<{ id: string, name: string, description1?: string, description2?: string }>;
  constructor() {
    super();
  }

  ngOnInit() { }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public onClickPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    if (event.currentTarget.classList.contains('no-expand')) {
      pnl.close();
    }
  }

  public dragStarted(event: any) {
    this.dragStart = event;
  }
}
