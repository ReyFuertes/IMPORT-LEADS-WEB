import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GenericPanelComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-contract-expansion-panel',
  templateUrl: './contract-expansion-panel.component.html',
  styleUrls: ['./contract-expansion-panel.component.scss']
})

export class ContractExpansionPanelComponent extends GenericPanelComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  @Input()
  public panels: Array<{ title: string, description: string }>;
  public selectedPnl: number | null;
  public dragIndex: number | null;
  public isTitleHover: number | null;
  public isTitleEditMode: boolean = false;
  public isDescEditMode: boolean = false;
  public isDescHover: number | null
  public isEventDialog: boolean = false;
  public dragStart: boolean = false;
  @Input()
  public isRightNavOpen: boolean = false;

  constructor() {
    super();
   }

  ngOnInit() {}

  ngOnChanges() {
    this.isRightNavOpen = this.isRightNavOpen;
  }

  public onClose(pnl?: any): void {
    pnl.close();
    this.isTitleEditMode = false;
    this.isDescEditMode = false;
  }

  public onSelect(colToEdit: 0 | 1): void {
    event.preventDefault();
    this.isTitleEditMode = colToEdit === 0 ? true : false;
    this.isDescEditMode = colToEdit === 1 ? true : false;
  }

  public mouseout(): void {
    this.dragIndex = null;
    this.isTitleHover = null;
    this.isDescHover = null;
  }

  public onEditMode(i: number, col: 0 | 1): void {
    event.preventDefault();
    this.selectedPnl = i;
    this.isTitleEditMode = col === 0 ? true : false;
    this.isDescEditMode = col === 1 ? true : false;
  }

  public onTitleHover(i: number): boolean {
    return this.isTitleHover === i;
  }

  public onDescHover(i: number): boolean {
    return this.isDescHover === i;
  }

  public mouseover(i: number, colIndctr: number): void {
    this.dragIndex = i;
    if (colIndctr === 0)
      this.isTitleHover = i;
    else
      this.isDescHover = i;
  }

  public dragStarted(event: any) {
    this.dragStart = event;
  }

  public isChecked(i: number, event: any): boolean {
    return this.selectedPnl == i;
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.panels, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  public expandPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    this.selectedPnl = i;
    const classList = event.target.parentNode.classList;
    if (classList.contains('no-expand')
      || classList.contains('actions-col')
      || classList.contains('ui-inputswitch')
      || event.target.tagName == 'DIV' && event.target.classList.contains('ui-inputswitch')
      || event.target.tagName == 'SPAN') {
      pnl.close();
    }
  }
}
