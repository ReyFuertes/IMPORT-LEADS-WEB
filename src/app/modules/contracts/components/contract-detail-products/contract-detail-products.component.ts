import { IProductPill, PillState } from './../../contract.model';
import { PillComponent } from './../../../../shared/components/pill/pill.component';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { SimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IContractProduct } from '../../contract.model';

@Component({
  selector: 'il-contract-detail-products',
  templateUrl: './contract-detail-products.component.html',
  styleUrls: ['./contract-detail-products.component.scss']
})

export class ContractDetailProductsComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public productsArray: FormArray;
  public subProductsArray: FormArray;
  public productPillsArr: IProductPill[] = [];
  public form: FormGroup;
  public hasSubProducts: boolean = false;
  public isEditProduct: boolean = false;
  private destroy$ = new Subject();
  public state: PillState = PillState.default;
  @Input()
  public isRightNavOpen: boolean = false;
  public items: Array<{ label: string, value: string }> = [
    {
      label: 'Product 1',
      value: '1'
    },
    {
      label: 'zxc 2',
      value: '2'
    },
    {
      label: 'bnm 3',
      value: '3'
    },
    {
      label: '67876',
      value: '4'
    },
    {
      label: 'SFDF',
      value: '5'
    },
  ];

  constructor(private dialog: MatDialog, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      qty: [null, Validators.required],
      cost: [null, Validators.required],
      subProducts: new FormArray([]),
    });

    //get the sub total of all productSet
    this.form.get('subProducts')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(subProducts => {
        const totalValueOfSubProducts = subProducts.reduce((sum, current) => parseInt(sum) + parseInt(current.cost), 0);
        const valueOfParentProduct = this.form.get('cost').value;

        //if the value of input is less than the value of sub products cost total, mark as invalid error
        if (parseInt(totalValueOfSubProducts) !== parseInt(valueOfParentProduct)) {
          this.form.controls['cost'].setErrors({ 'invalid': true });
        } else {
          this.form.controls['cost'].setErrors(null);
        }
      })
  }

  ngOnDestroy() { }

  ngOnInit() { }

  ngAfterViewInit() { }

  public removeSelection(): void {
    const pillArrContainer = document.querySelectorAll('.pill-container');
    pillArrContainer && pillArrContainer.forEach((item) => {
      item.classList.remove("selected");
    })
  }

  private onResetForm(): void {
    this.form.reset();
    this.hasSubProducts = false;
    if (this.subProductsArray) this.subProductsArray.clear();
    this.isEditProduct = false;
  }

  public createItem(item: SimpleItem): FormGroup {
    return this.fb.group(item);
  }

  public createSubItem(item: IContractProduct): FormGroup {
    return this.fb.group(item);
  }

  public onRemove(value: string | number): void {
    const i = this.productPillsArr.findIndex(x => x.id === value);
    this.productPillsArr.splice(i);
  }

  public addProductToPills(): void {
    if (this.form.value) {
      const id = this.productPillsArr.length + 1;
      this.form.controls['id'].patchValue(id);
      this.productPillsArr.push(this.form.value);
      this.onResetForm();
    }
    console.log(this.productPillsArr);
  }

  public onEditProductSave(): void {
    if (this.form.value) {
      const product: IProductPill = Object.assign([], this.form.value);
      const i = this.productPillsArr.findIndex(x => x.id === product.id);
      this.productPillsArr[i] = product;
      this.isEditProduct = !this.isEditProduct;
      this.onResetForm();
    }
  }

  public OnEditProduct(product: IProductPill): void {
    this.form.controls['id'].patchValue(product.id);
    this.form.controls['name'].patchValue(product.name);
    this.form.controls['qty'].patchValue(product.qty);
    this.form.controls['cost'].patchValue(product.cost);
    this.form.controls['subProducts'].patchValue(product.subProducts);

    if (product.subProducts.length > 0) {
      this.subProductsArray = this.form.get('subProducts') as FormArray;
      if (this.subProductsArray) this.subProductsArray.clear();
      product.subProducts && product.subProducts.forEach(subItem => {
        const item = this.createSubItem({
          name: subItem.name,
          qty: subItem.qty,
          cost: subItem.cost
        });
        this.subProductsArray.push(item);
      });
      this.hasSubProducts = !this.hasSubProducts;
    }

    this.isEditProduct = !this.isEditProduct;
    if (!this.isEditProduct) this.onResetForm();
  }

  public onShowSubProduct(): void {
    if (!this.subProductsArray || this.subProductsArray.length === 0) {
      this.onAddSubProduct();
    } else {
      this.subProductsArray.clear();
      this.form.controls['cost'].setErrors(null);
    }
    this.hasSubProducts = !this.hasSubProducts;
    this.cdRef.detectChanges();
  }

  public onAddSubProduct(): void {
    const products: IProductPill = Object.assign([], this.form.value);
    this.subProductsArray = this.form.get('subProducts') as FormArray;

    const item = this.createSubItem({
      name: products.name,
      qty: this.form.get('qty').value,
      cost: 1,
    });
    this.subProductsArray.push(item);
    this.cdRef.detectChanges();
  }

  public onRemoveProduct(product: IProductPill): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.productPillsArr.indexOf(product);
        if (index > -1)
          this.productPillsArr.splice(index, 1);

        this.onResetForm();
      }
    });
  }

  public onRemoveSubProduct(product: IProductPill, subProduct: IProductPill, i: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //remove from displayed array
        const index = product.subProducts.indexOf(subProduct);
        if (index > -1) {
          product.subProducts.splice(index, 1);
        }
        //remove from form binding
        const item = this.form.get('subProducts') as FormArray;
        item.removeAt(i);
        this.onResetForm();
      }
    });
  }
}

