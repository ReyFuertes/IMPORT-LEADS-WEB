import { ContractCategoryTermDialogComponent } from './../../../dialogs/components/contract-category-term/contract-category-term-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { trigger, transition, style, state, animate } from '@angular/animations';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

export class TableExpandableRowsExample {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'description', 'action-col'];
  term: | null;
}
const ELEMENT_DATA: ITerm[] = [
  {
    id: '111',
    name: '2G1W Dimmer Picture',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  }, {
    id: '222',
    name: 'Helium',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha…`
  }
];
export interface ITerm {
  id?: string;
  name: string;
  description: string;
}

@Component({
  selector: 'il-contract-product-category-table',
  templateUrl: './contract-product-category-table.component.html',
  styleUrls: ['./contract-product-category-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ContractProductCategoryTableComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public dataSource = ELEMENT_DATA;
  public columnsToDisplay = ['name', 'description', 'action-col'];
  public expandedElement: ITerm | null;
  public selectedCol: string;
  public actionState: boolean = false;
  @Input()
  public isRightNavOpen: boolean = false;
  public items: ISimpleItem[] = [
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    }
  ];
  public form: FormGroup;
  public tagForm: FormGroup;
  public isEditName: boolean = false;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.form = this.fb.group({
      term_name: [null],
      description: [null]
    })
    this.tagForm = this.fb.group({
      contract_tag: [null]
    })
  }

  ngOnInit() { }

  public createTerm(): void {
    const dialogRef = this.dialog.open(ContractCategoryTermDialogComponent, {
      height: '270px'
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        console.log(result);
      }
    });
  }

  public onExpand(event: any, col: string): void {
    this.expandedElement = (this.expandedElement === event) ? null : event;
    this.selectedCol = event[col];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.isRightNavOpen)
      this.isRightNavOpen = changes.isRightNavOpen.currentValue;
  }
}
