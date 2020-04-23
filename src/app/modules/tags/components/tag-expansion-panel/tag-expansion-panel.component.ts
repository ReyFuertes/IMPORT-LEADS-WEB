import { TagsDialogComponent } from 'src/app/modules/dialogs/components/tags/tags-dialog.component';
import { SimpleItem } from './../../../../shared/generics/generic.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { MatDialog } from '@angular/material/dialog';
import { TagsQuestionDialogComponent } from 'src/app/modules/dialogs/components/tags-question/tags-question-dialog.component';
import { Tag } from '../../tags.models';

@Component({
  selector: 'il-tag-expansion-panel',
  templateUrl: './tag-expansion-panel.component.html',
  styleUrls: ['./tag-expansion-panel.component.scss']
})

export class TagExpansionPanelComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: Tag[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() { }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public dragStarted(event: any): void {
    this.dragStart = event;
  }

  public onAddTag(): void {
    const dialogRef = this.dialog.open(TagsDialogComponent, { data: {} });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.items.push({ id: 6, name: result, questions: [] });
      }
     });
  }
}
