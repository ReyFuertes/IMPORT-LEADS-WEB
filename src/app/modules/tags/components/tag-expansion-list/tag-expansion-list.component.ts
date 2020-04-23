import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TagsQuestionDialogComponent } from 'src/app/modules/dialogs/components/tags-question/tags-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Tag } from '../../tags.models';

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
  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public dragStarted(event: any): void {
    this.dragStart = event;
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
        this.questions.push(result);
      }
     });
  }
}
