import { FormBuilder, FormGroup } from '@angular/forms';
import { Contract, ProductImage } from './../../contract.model';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject, Output, EventEmitter } from '@angular/core';
import { ContractAddDialogComponent } from 'src/app/modules/dialogs/components/contracts/contract-add-dialog.component';
import { ContractTemplateDialogComponent } from 'src/app/modules/dialogs/components/contract-template/contract-template-dialog.component';
import { GenericPageDetailComponent } from 'src/app/shared/generics/generic-page-detail';
import { Observable, fromEvent } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddEditState } from 'src/app/shared/generics/generic.model';

@Component({
  selector: 'il-contract-detail-page',
  templateUrl: './contract-detail-page.component.html',
  styleUrls: ['./contract-detail-page.component.scss']
})

export class ContractDetailPageComponent extends GenericPageDetailComponent<Contract> implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public options: Array<{ id: number, label: string, icon: string, action?: () => void }>;
  public _showTabActions: boolean = false;
  public showRightNav: boolean = false;
  public dragStartSpecs: boolean = false;
  public contractImages: ProductImage[] = [{
    id: 1,
    name: 'product-img.png'
  }, {
    id: 2,
    name: 'product-img.png'
  }, {
    id: 3,
    name: 'product-img.png'
  }, {
    id: 4,
    name: 'product-img.png'
  }, {
    id: 5,
    name: 'product-img.png'
  }];

  public specifications: Array<{ id: number, title: string, specification?: any}> = [
    {
      id: 1,
      title: ''
    },
    {
      id: 2,
      title: ''
    }
  ];

  @Output()
  public openNavChange = new EventEmitter<boolean>();

  constructor(public fb: FormBuilder, public dialog: MatDialog) {
    super();
    this.form = this.fb.group({
      id: ['c28c801d-6556-42aa-8b8c-072f7eb4b17d'],
      title: ['PI SK19NL0806-1 Touch Dim'],
      venue: ['Canhui toys limited'],
      startDate: [new Date('01/09/2019')],
      deliveryDate: [new Date('03/12/2019')],
      details: ['Lorem Ipsum is simply dummy text of the printing industry'],
      attachments: [null]
    });
  }

  @ViewChild('scrollPnl', { static: false }) public scrollPnl: any;
  ngOnInit() {
    this.options = [
      {
        id: 1,
        label: 'Edit contract',
        icon: 'edit-icon-blue.svg',
        action: this.editContract
      },
      {
        id: 2,
        label: 'Download',
        icon: 'download-icon-blue.svg'
      },
      {
        id: 3,
        label: 'Create or update checklist',
        icon: 'templates-icon-blue.svg',
        action: this.createUpdateTemplate
      },
      {
        id: 4,
        label: 'Save as template',
        icon: 'save-icon-blue.svg',
        action: this.saveContractAsTemplate
      },
      {
        id: 5,
        label: 'Delete contract',
        icon: 'delete-icon-red.svg'
      }
    ];

    fromEvent(window, "scroll").subscribe((e: any) => {
      document.querySelector('.inner-container').scrollTop = (document.documentElement.scrollTop);
    });
  }

  public showTabActions(): void {
    this._showTabActions != this._showTabActions;
  }

  public createUpdateTemplate = (): void => {
    this.showRightNav = !this.showRightNav;
    this.openNavChange.emit(this.showRightNav);
  }

  public editContract = (): void => {
    const dialogRef = this.dialog.open(ContractAddDialogComponent, {
      data: {
        formValues: this.form.value,
        state: AddEditState.Edit
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  public saveContractAsTemplate = (): void => {
    const dialogRef = this.dialog.open(ContractTemplateDialogComponent, {
      data: {
        formValues: this.form.value,
        state: AddEditState.Edit
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  public drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.contractImages, event.previousIndex, event.currentIndex);
  }

  public dropSpecs(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.specifications, event.previousIndex, event.currentIndex);
  }

  public dragStartedSpecs(event: any) {
    this.dragStartSpecs = event;
  }

  public handleRemoveSpecsTitle(specificationId: number) {
    this.specifications.find(spec => spec.id === specificationId).title = '';
  }
}
