import { ITagQuestion } from './../../tags.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TagsQuestionDialogComponent } from 'src/app/modules/dialogs/components/tags-question/tags-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ITag } from '../../tags.model';

@Component({
  selector: 'il-tag-expansion-list',
  templateUrl: './tag-expansion-list.component.html',
  styleUrls: ['./tag-expansion-list.component.scss']
})

export class TagExpansionListComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: string[];

  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public selectedItem: ITagQuestion;

  @Output()
  public valueEmitter = new EventEmitter<ITagQuestion>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public dragStarted(event: any): void {
    this.dragStart = event;
  }

  public onEdit(item: ITag, value: string): void {
    this.selectedItem = item;
    if (value)
      item.tag_name = value;
  }

  public onClose(): void {
    setTimeout(() => {
      this.selectedIndex = null;
    }, 100);
  }

  public mouseout(): void {
    this.hoveredIndex = null;
    this.selectedIndex = null;
  }

  public mouseover(i: number): void {
    this.hoveredIndex = i;
  }

  public onAddQuestion(event: any): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(TagsQuestionDialogComponent, { data: {} });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.items.push(result);
      }
    });
  }
}
