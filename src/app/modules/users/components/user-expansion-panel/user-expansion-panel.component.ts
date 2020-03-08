import { User } from './../../users.models';
import { SimpleItem } from 'src/app/shared/generics/generic.model';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';
import { UserAccess } from '../../users.models';
import { DropdownSelect } from './../../../../shared/generics/generic.model';

@Component({
  selector: 'il-user-expansion-panel',
  templateUrl: './user-expansion-panel.component.html',
  styleUrls: ['./user-expansion-panel.component.scss']
})
export class UserExpansionPanelComponent extends GenericPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public users: User[];
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;
  public selectedRole: SimpleItem;
  public roles: SimpleItem[] = [
    {
      value: '1',
      label: 'Admin',
    },
    {
      value: '2',
      label: 'Inspector'
    },
    {
      value: '3',
      label: 'Manager'
    },
  ];
  public access: DropdownSelect[] = [
    {
      id: 1,
      label: 'Contracts'
    },
    {
      id: 2,
      label: 'Inspections'
    },
    {
      id: 3,
      label: 'Executing Inspections'
    },
    {
      id: 4,
      label: 'Data Pages'
    },
    {
      id: 5,
      label: 'Platform Settings'
    },
    {
      id: 6,
      label: 'Chat'
    },
  ];
  public dragStart: boolean = false;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  public selectedRoleChange(event: any): void {
    this.selectedRole = event;
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

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public getAccessString(access: UserAccess[]): string {
    let accessString = '';
    for (const acc of access) {
      accessString = accessString + acc.title + ', ';
    }
    return accessString.replace(/,\s*$/, '');
  }

  public onPreventExpandPanel(event: any) {
    event.stopPropagation();
  }

}
