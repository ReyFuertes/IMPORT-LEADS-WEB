import { SimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ContractProduct } from '../../contract.model';

export interface ProductPill {
  id?: string | number;
  name: string;
  qty: string | number;
  cost: string | number;
  subProducts: SubProductPill[];
}
export interface SubProductPill {
  id?: string | number;
  name: string;
  qty: string | number;
  cost: string | number;
}

@Component({
  selector: 'il-contract-detail-products',
  templateUrl: './contract-detail-products.component.html',
  styleUrls: ['./contract-detail-products.component.scss']
})

export class ContractDetailProductsComponent implements OnInit, AfterViewInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public productsArray: FormArray;
  public subProductsArray: FormArray;
  public productPillsArray: ProductPill[] = [];
  public form: FormGroup;
  public hasSubProducts: boolean = false;
  public isEditProduct: boolean = false;
  private destroy$ = new Subject();
  @Input()
  public isRightNavOpen: boolean = false;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
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

  ngOnDestroy() {}

  ngOnInit() { }

  ngAfterViewInit() {}

  ngOnChanges() {
    this.isRightNavOpen = this.isRightNavOpen;
  }

  private onResetForm(): void {
    this.form.reset();
    this.hasSubProducts = false;
    if (this.subProductsArray) this.subProductsArray.clear();
  }

  public createItem(item: SimpleItem): FormGroup {
    return this.fb.group(item);
  }

  public createSubItem(item: ContractProduct): FormGroup {
    return this.fb.group(item);
  }

  public onRemove(value: string | number): void {
    const i = this.productPillsArray.findIndex(x => x.id === value);
    this.productPillsArray.splice(i);
  }

  public addProductToPills(): void {
    if (this.form.value) {
      const id = this.productPillsArray.length + 1;
      this.form.controls['id'].patchValue(id);
      this.productPillsArray.push(this.form.value);
      this.onResetForm();
    }
  }

  public onEditProductSave(): void {
    if (this.form.value) {
      const product: ProductPill = Object.assign([], this.form.value);
      const i = this.productPillsArray.findIndex(x => x.id === product.id);
      this.productPillsArray[i] = product;
      this.isEditProduct = !this.isEditProduct;
      this.onResetForm();
    }
  }

  public OnEditProduct(product: ProductPill): void {
    this.form.controls['id'].patchValue(product.id);
    this.form.controls['name'].patchValue(product.name);
    this.form.controls['qty'].patchValue(product.qty);
    this.form.controls['cost'].patchValue(product.cost);
    this.form.controls['subProducts'].patchValue(product.subProducts);
    if (product.subProducts.length > 0) {
      this.subProductsArray = this.form.get('subProducts') as FormArray;
      if (this.subProductsArray) this.subProductsArray.clear();
      product.subProducts.forEach(subItem => {
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
    if (!this.isEditProduct)  this.onResetForm();
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
    const products: ProductPill = Object.assign([], this.form.value);
    this.subProductsArray = this.form.get('subProducts') as FormArray;
    const item = this.createSubItem({
      name: products.name,
      qty: 1,
      cost: 1,
    });
    this.subProductsArray.push(item);
    this.cdRef.detectChanges();
  }

  public onRemoveSubProduct(index: number): void {
    const subProduct = this.form.get('subProducts') as FormArray;
    subProduct.removeAt(index);
  }
}

