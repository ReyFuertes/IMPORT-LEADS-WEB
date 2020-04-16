import { getAllContractsSelector } from './../../store/selectors/contracts.selector';
import { addProducts } from './../../store/actions/products.action';
import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { IProduct, PillState, IContract, IContractProduct, IContractResponse } from './../../contract.model';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { SimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { take, takeUntil, filter, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'il-contract-detail-products',
  templateUrl: './contract-detail-products.component.html',
  styleUrls: ['./contract-detail-products.component.scss']
})

export class ContractDetailProductsComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public productsArray: FormArray;
  public subProductsArray: FormArray;
  public productPillsArr: IProduct[] = [];
  public form: FormGroup;
  public hasSubProducts: boolean = false;
  public isEditProduct: boolean = false;
  private destroy$ = new Subject();
  public state: PillState = PillState.default;
  public suggestions: SimpleItem[];

  @Input()
  public isRightNavOpen: boolean = false;
  @Input()
  public contract: IContract;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.form = this.fb.group({
      id: [null],
      product_name: [null, Validators.required],
      qty: [null, Validators.required],
      cost: [null, Validators.required],
      sub_products: new FormArray([]),
      contract: [null],
      cp_id: [null]
    });
    //get the sub total of all productSet
    this.form.get('sub_products')
      .valueChanges.pipe(takeUntil(this.destroy$), filter((result) => !!result))
      .subscribe(children => {
        if (children) {
          const totalValueOfSubProducts = children.reduce((sum, current) => parseInt(sum) + parseInt(current.cost), 0);
          const valueOfParentProduct = this.form.get('cost').value;
          //if the value of input is less than the value of sub products cost total, mark as invalid error
          if (parseInt(totalValueOfSubProducts) !== parseInt(valueOfParentProduct)) {
            this.form.controls['cost'].setErrors({ 'invalid': true });
          } else {
            this.form.controls['cost'].setErrors(null);
          }
        }
      })
  }

  ngOnDestroy() { }

  ngOnInit() {
    //map products to suggestions
    // this.store.pipe(select(getAllContractProductsSelector),
    //   tap(p => this.suggestions = this.suggest(p)))
    //   .subscribe();
    // this.suggestions = this.suggest(this.contract.products);
  }

  public subProductsArr = () => this.form.get('sub_products') as FormArray;

  ngAfterViewInit() {
    this.productPillsArr = this.contract.contract_products;
    this.cdRef.detectChanges();
  }

  public onAdd(): void {
    if (this.form.value) {
      const { id, product_name, qty, cost, sub_products } = this.form.value;

      const products: IProduct[] = Object.assign([], sub_products);
      products.push({ product_name, qty, cost });

      const payload = {
        parent: _.pickBy({ id, product_name, qty, cost }, _.identity),
        child: Object.assign([], sub_products),
        contract: this.contract
      }

      this.productPillsArr.push(this.form.value);
      this.store.dispatch(addProducts({ payload }));
      this.onResetForm();
    }
  }

  public onSave(): void {
    if (this.form.value) {
      const { id, product_name, cost, qty, sub_products, cp_id } = this.form.value;
      const i = this.productPillsArr.findIndex(x => x.id === id);
      this.productPillsArr[i] = this.form.value;
      this.isEditProduct = !this.isEditProduct;
      debugger
      this.store.dispatch(addProducts({
        payload: {
          cp_id,
          parent: _.pickBy({ id, product_name, qty, cost }, _.identity),
          child: Object.assign([], sub_products),
          contract: this.contract
        }
      }));
      this.onResetForm();
    }
  }

  private suggest(conProducts: IProduct[]): SimpleItem[] {
    return conProducts && conProducts.reduce(
      ({ }, { id, product_name, sub_products }) => [{ value: id, label: product_name }]
        .concat(sub_products.map((sub) => ({ value: id, label: product_name, ...{ value: sub.id, label: sub.product_name } }))),
      []
    );
  }

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

  public createSubItem(item: IProduct): FormGroup {
    return this.fb.group(item);
  }

  public onRemove(value: string | number): void {
    const i = this.productPillsArr.findIndex(x => x.id === value);
    this.productPillsArr.splice(i);
  }

  public OnEditProduct(product: IProduct): void {
    if (!product) return;
    //assign selected item to form
    const { id, product_name, qty, cost, sub_products, cp_id } = product;
    this.form.controls['id'].patchValue(id);
    this.form.controls['product_name'].patchValue(product_name);
    this.form.controls['qty'].patchValue(qty);
    this.form.controls['cost'].patchValue(cost);
    this.form.controls['sub_products'].patchValue(sub_products);
    this.form.controls['cp_id'].patchValue(cp_id);

    if (sub_products && sub_products.length > 0) {
      this.subProductsArray = this.form.get('sub_products') as FormArray;
      if (this.subProductsArray) this.subProductsArray.clear();

      sub_products && sub_products.forEach(subItem => {
        const item = this.createSubItem({
          id: subItem.id,
          product_name: subItem.product_name,
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

  }

  public onAddSubProduct(): void {
    const item: IProduct = Object.assign([], this.form.value);
    this.subProductsArray = this.form.get('sub_products') as FormArray;

    const result = this.createSubItem({
      product_name: item.product_name,
      qty: this.form.get('qty').value,
      cost: 1,
    });
    this.subProductsArray.push(result);
    this.cdRef.detectChanges();
  }

  public onRemoveProduct(product: IProduct): void {
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

  public onRemoveSubProduct(product: IProduct, subProduct: IProduct, i: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //remove from displayed array
        const index = product.sub_products.indexOf(subProduct);
        if (index > -1) {
          product.sub_products.splice(index, 1);
        }
        //remove from form binding
        const item = this.form.get('sub_products') as FormArray;
        item.removeAt(i);
        this.onResetForm();
      }
    });
  }
}

