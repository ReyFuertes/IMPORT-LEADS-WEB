import { User } from './../../../users/users.models';
import { ReOrderImages } from './../../store/contracts.action';
import { tap } from 'rxjs/operators';
import { getContractById } from './../../store/contracts.selector';
import { AppState } from './../../../../store/app.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IContract, IProductImage } from './../../contract.model';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ContractAddDialogComponent } from 'src/app/modules/dialogs/components/contracts-add/contract-add-dialog.component';
import { ContractTemplateDialogComponent } from 'src/app/modules/dialogs/components/contract-template/contract-template-dialog.component';
import { GenericPageDetailComponent } from 'src/app/shared/generics/generic-page-detail';
import { Observable, fromEvent } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddEditState } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'il-contract-detail-page',
  templateUrl: './contract-detail-page.component.html',
  styleUrls: ['./contract-detail-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContractDetailPageComponent extends GenericPageDetailComponent<IContract> implements OnInit {
  public id: string;
  public $contract: Observable<IContract>;
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public options: Array<{ id: number, label: string, icon: string, action?: () => void }>;
  public _showTabActions: boolean = false;
  public showRightNav: boolean = false;
  public dragStartSpecs: boolean = false;
  public imgUrl: string = `${environment.apiUrl}contracts/image/`;
  public contractImages: IProductImage[];
  public images: any[];

  public specifications: Array<{ id: number, title: string, specification?: any }> = [
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
  @ViewChild('scrollPnl', { static: false }) public scrollPnl: any;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, public fb: FormBuilder, public dialog: MatDialog) {
    super();
    this.form = this.fb.group({
      id: [null],
      contract_name: [null],
      venue: [null],
      startDate: [null],
      delivery_date: [null],
      details: [null],
      images: [null]
    });
  }

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

    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.$contract = this.store.pipe(select(getContractById(this.id)));
      //passed the contract images to a variable array so we can drag and drop
      this.$contract && this.$contract.subscribe(c => {
        if (c) {
          this.form.patchValue(c);
          this.contractImages = c.images.sort((a, b) => this.orderByAsc(a, b));
        }
      });
    }
  }

  public get hasImgs(): boolean {
    return this.contractImages && this.contractImages.length > 0;
  }

  public get getContractImages(): IProductImage[] {
    return this.contractImages.slice(0, 4);
  }

  public getFullName(user: User): string {
    return user ? `${user.firstname} ${user.lastname}` : '';
  }

  private orderByAsc(a, b): any {
    return (a, b) => {
      if (a.position > b.position) return 1;
      if (a.position < b.position) return -1;
      return 0;
    }
  }

  public getBg(url: string): string {
    return `url(${url})`;
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
        id: this.id,
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

  public trackByField = (i: number, field: IProductImage) => field.position = i;
  public dropImages(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.contractImages, event.previousIndex, event.currentIndex);
    //update reorder images
    setTimeout(() => this.store.dispatch(ReOrderImages({ images: this.contractImages })), 200);
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
  public handleRemoveProductSpecs(specificationId: number) {
    this.specifications = this.specifications.filter(specification => specification.id !== specificationId);
  }
}
