import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { UserAccess } from '../../users.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-user-expansion-panel',
  templateUrl: './user-expansion-panel.component.html',
  styleUrls: ['./user-expansion-panel.component.scss']
})
export class UserExpansionPanelComponent extends GenericPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public users: any[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;

  constructor() {
    super();
   }

  ngOnInit() {
  }

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public getAccessString(access: UserAccess[]): string {
    let accessString = '';
    for (const acc of access) {
      accessString = accessString + acc.title + ',';
    }
    return accessString.replace(/,\s*$/, '');
  }

  public onPreventExpandPanel(event: any) {
    event.stopPropagation();
  }

}
