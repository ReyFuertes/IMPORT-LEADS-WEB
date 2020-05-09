import { addContractTerm } from './../../store/actions/contract-term.actions';
import { loadContractCategory } from './../../store/actions/contract-category.action';
import { MatTableDataSource } from '@angular/material/table';
import { IContractTerm } from './../../contract.model';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { getTagsSelector } from '../../../tags/store/tags.selector';
import { AppState } from '../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { ITag } from '../../../tags/tags.model';
import { Observable } from 'rxjs';
import { ContractCategoryTermDialogComponent } from '../../../dialogs/components/contract-category-term/contract-category-term-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISimpleItem } from '../../../../shared/generics/generic.model';
import { environment } from '../../../../../environments/environment';
import { trigger, transition, style, state, animate } from '@angular/animations';
import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IContractCategory } from '../../contract.model';
import { deleteContractCategory } from '../../store/actions/contract-category.action';

@Component({
  selector: 'il-contract-category-table',
  templateUrl: './contract-category-table.component.html',
  styleUrls: ['./contract-category-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ContractCategoryTableComponent implements OnInit, OnChanges, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public dataSource: MatTableDataSource<IContractTerm[]>;
  public columnsToDisplay = ['term_name', 'term_description', 'action_col'];
  public expandedElement: IContractTerm | null;
  public selectedCol: string;
  public actionState: boolean = false;
  public items: ISimpleItem[];
  public form: FormGroup;
  public tagForm: FormGroup;
  public isEditName: boolean = false;
  public $tags: Observable<ISimpleItem[]>;

  @Input()
  public isRightNavOpen: boolean = false;
  @Input()
  public contract_category: IContractCategory;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private fb: FormBuilder) {
    this.form = this.fb.group({
      term_name: [null],
      term_description: [null]
    })
    this.tagForm = this.fb.group({
      contract_tag: [null]
    })
  }

  ngOnInit() {
    this.$tags = this.store.pipe(select(getTagsSelector),
      map((tags: ITag[]) => tags.map(ret => {
        return {
          label: ret.tag_name,
          value: ret.id
        }
      })));
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.contract_category.terms);
  }

  public onDelete = (id: string): void => {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteContractCategory({ id }));
      }
    });
  }

  public createTerm(): void {
    const dialogRef = this.dialog.open(ContractCategoryTermDialogComponent, {
      height: '270px'
    });
    dialogRef.afterClosed().subscribe((result: IContractTerm) => {
      if (result) {
        const payload = {
          ...result,
          contract_category: { id: this.contract_category.id }
        }
        this.store.dispatch(addContractTerm({ payload }));
        /* this is a bad solution, but due to time development i just needs this */
        setTimeout(() => {
          this.store.dispatch(loadContractCategory({ id: this.contract_category.contract.id }))
        }, 1000);
      }
    });
  }

  public onExpand(event: any, col: string): void {
    this.expandedElement = (this.expandedElement === event) ? null : event;
    this.selectedCol = event[col];
  }

  public isHidden(element: IContractTerm): boolean {
    return element && element.term_description == this.selectedCol
      || element && element.term_name == this.selectedCol;
  }

  public onClose(): void {
    this.expandedElement = null;
    this.selectedCol = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.isRightNavOpen)
      this.isRightNavOpen = changes.isRightNavOpen.currentValue;

    if (changes && changes.contract_category)
      this.dataSource = new MatTableDataSource<any>(changes.contract_category.currentValue.terms);
  }
}
