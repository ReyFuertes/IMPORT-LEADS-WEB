import { ITag } from './../../tags.model';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { TagsDialogComponent } from 'src/app/modules/dialogs/components/tags/tags-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { MatDialog } from '@angular/material/dialog';
import { addTag } from '../../store/tags.actions';

@Component({
  selector: 'il-tag-expansion-panel',
  templateUrl: './tag-expansion-panel.component.html',
  styleUrls: ['./tag-expansion-panel.component.scss']
})

export class TagExpansionPanelComponent extends GenericRowComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public items: ITag[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
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
        const item: ITag = { tag_name: result };
        this.store.dispatch(addTag({ item }));
      }
    });
  }
}
