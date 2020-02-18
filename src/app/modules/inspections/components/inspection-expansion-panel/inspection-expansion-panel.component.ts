import { Router } from '@angular/router';
import { SimpleItem, Menu } from './../../../../shared/generics/generic.model';
import { InspectionPanelModel } from './../../inspections.models';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-inspection-expansion-panel',
  templateUrl: './inspection-expansion-panel.component.html',
  styleUrls: ['./inspection-expansion-panel.component.scss']
})

export class InspectionExpansionPanelComponent extends GenericPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public menus: Menu[];
  @Input()
  public colsHeaders: Array<{ label: string, width?: string | number }>;
  @Input()
  public items: InspectionPanelModel[];
  @Input()
  public isCategory: boolean = false;
  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
    this.menus =  [
      {
        label: 'EDIT',
        value: 'EDIT',
        icon: 'edit-icon-black.svg',
        action: this.onEdit
      },
      {
        label: 'REPORT',
        value: 'REPORT',
        icon: 'inspection-icon-black.svg'
      },
      {
        label: 'DELETE',
        value: 'DELETE',
        icon: 'delete-icon-red.svg'
      }
    ];
  }

  public onEdit = () => {
    this.router.navigateByUrl('/dashboard/inspections/run-template');
  }

  public expandPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    const classList = event.target.parentNode.classList;
    if (classList.contains('action-col')) {
      pnl.close();
    }
  }
}
