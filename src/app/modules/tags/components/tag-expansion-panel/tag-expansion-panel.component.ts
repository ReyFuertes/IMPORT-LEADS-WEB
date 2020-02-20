import { SimpleItem } from './../../../../shared/generics/generic.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-tag-expansion-panel',
  templateUrl: './tag-expansion-panel.component.html',
  styleUrls: ['./tag-expansion-panel.component.scss']
})

export class TagExpansionPanelComponent extends GenericPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: Array<{ id: string, name: string, questions?: string[] }>;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;

  constructor() {
    super();
  }

  ngOnInit() { }
}
