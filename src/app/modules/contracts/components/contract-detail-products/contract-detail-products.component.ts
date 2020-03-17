import { SimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ContractProduct } from '../../contract.model';

export interface ProductPill {
  id?: string | number;
  name: string;
  qty: string | number;
  cost: string | number;
  subProducts: SubProductPill[]
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

export class ContractDetailProductsComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public productsArray: FormArray;
  public subProductsArray: FormArray;
  public productPillsArray: SimpleItem[] = [];
  public form: FormGroup;
  public hasSubProducts: boolean = false;
  private destroy$ = new Subject();
  @Input()
  public isRightNavOpen: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
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

  ngOnDestroy() {
    this.destroy$.next();
  }

  ngOnInit() { }

  ngOnChanges() {
    this.isRightNavOpen = this.isRightNavOpen;
  }

  public createItem(item: SimpleItem): FormGroup {
    return this.fb.group(item);
  }

  public createSubItem(item: ContractProduct): FormGroup {
    return this.fb.group(item);
  }

  public flattenProductArray(rawProduct: ProductPill): SimpleItem[] {
    const newItem: SimpleItem[] = [];
    newItem.push({
      label: rawProduct.name,
      value: rawProduct.name
    });
    rawProduct.subProducts && rawProduct.subProducts.forEach(subProduct => {
      newItem.push({
        label: subProduct.name,
        value: subProduct.name
      });
    })
    return newItem;
  }

  public onRemove(value: string | number): void {
    const i = this.productPillsArray.findIndex(x => x.value === value);
    this.productPillsArray.splice(i);
  }

  public addProductToPills(): void {
    if (this.form.value) {
      const products: SimpleItem[] = Object.assign([], this.flattenProductArray(this.form.value));
      this.productPillsArray.push(...products);

      this.form.reset();
      this.hasSubProducts = false;
      if (this.subProductsArray) this.subProductsArray.clear();
    }
  }

  public onShowSubProduct(): void {
    if (!this.subProductsArray || this.subProductsArray.length === 0) {
      this.onAddSubProduct();
    } else {
      this.subProductsArray.clear();
      this.form.controls['cost'].setErrors(null);
    }
    this.hasSubProducts = !this.hasSubProducts;
  }

  public onAddSubProduct(): void {
    this.subProductsArray = this.form.get('subProducts') as FormArray;
    const item = this.createSubItem({
      name: '',
      qty: 1,
      cost: 1,
    })
    this.subProductsArray.push(item);
  }

  public onRemoveSubProduct(index: number): void {
    const subProduct = this.form.get('subProducts') as FormArray;
    if (subProduct.length > 1) {
      subProduct.removeAt(index);
    }
  }
}

