import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-tag-expansion-list',
  templateUrl: './tag-expansion-list.component.html',
  styleUrls: ['./tag-expansion-list.component.scss']
})

export class TagExpansionListComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public questions: string[];

  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  constructor() { }

  ngOnInit() { }

  public onClose(): void {
    setTimeout(() => {
      this.selectedIndex = null;
    }, 100);
  }

  public mouseout(): void {
    this.hoveredIndex = null;
    this.selectedIndex = null;
  }

  public onHover(i: number) {
    this.hoveredIndex = i;
  }
}
