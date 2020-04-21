
import { getAllContractsSelector, getAllContractProductsSelector } from './../../store/selectors/contracts.selector';
import { addContractProducts, deleteContractProduct, updateContractProduct } from './../../store/actions/products.action';
import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { IProduct, PillState, IContract, IContractProduct, IContractResponse } from './../../contract.model';
import { ConfirmationComponent } from './../../../dialogs/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { SimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { take, takeUntil, filter, tap, concatMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'il-contract-detail-products',
  templateUrl: './contract-detail-products.component.html',
  styleUrls: ['./contract-detail-products.component.scss']
})

export class ContractDetailProductsComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public productsArray: FormArray;
  public formSubProdsArr: FormArray;
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
  public $contractProducts: Observable<IContractProduct[]>;

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
          const totalValOfSP = children.reduce((sum, current) => parseInt(sum) + parseInt(current.cost), 0) || 0;
          const valOfParent = this.form.get('cost').value;

          //if the value of input is less than the value of sub products cost total, mark as invalid error
          if (parseInt(totalValOfSP) > parseInt(valOfParent)) {
            this.form.controls['cost'].setErrors({ 'invalid': true });
          } else {
            this.form.controls['cost'].setErrors(null);
          }
        }
      })
  }

  ngOnDestroy() { }

  ngOnInit() {
    this.$contractProducts = this.store.pipe(select(getAllContractProductsSelector));
    this.$contractProducts.subscribe((p: IProduct[]) => {
      const subProducts = _.flatten(p
        .filter(o => o && o.sub_products.length > 0)
        .map(o => o.sub_products));

      const parents = p.map(p => {
        return { id: p.id, product_name: p.product_name }
      });
      this.suggestions = parents.concat(subProducts).map(cp => {
        return {
          value: cp.id,
          label: cp.product_name
        }
      })
    });
  }

  public subProductsArr = () => this.form.get('sub_products') as FormArray;

  ngAfterViewInit() {
    this.productPillsArr = this.contract.contract_products;
    this.cdRef.detectChanges();
  }

  public onAdd(): void {
    if (this.form.value) {
      let payload: IContractProduct = this.fmtPayload(this.form.value);
      if (payload)
        this.store.dispatch(addContractProducts({ payload }));

      this.onResetForm();
    }
  }

  private fmtProductName(name: any | string): any {
    if (typeof (name) === 'object') {
      return name.label;
    } else {
      return name;
    }
  }

  private fmtSubProducts(sp: IProduct[]): any {
    return sp.map(sp => {
      return _.pickBy({
        id: sp.id,
        product_name: this.fmtProductName(sp.product_name),
        qty: sp.qty,
        cost: sp.cost
      }, _.identity)
    })
  }

  private fmtPayload(value: any): any {
    const { id, product_name, qty, cost, sub_products } = value;
    return {
      parent: _.pickBy({
        id,
        product_name: this.fmtProductName(product_name),
        qty, cost
      }, _.identity),
      child: Object.assign([], this.fmtSubProducts(sub_products)),
      contract: { id: this.contract.id, contract_name: this.contract.contract_name }
    }
  }

  public onSave(): void {
    if (this.form.value) {
      this.isEditProduct = !this.isEditProduct;

      this.store.dispatch(updateContractProduct({
        payload: this.fmtPayload(this.form.value)
      }));
      this.onResetForm();
    }
  }

  public OnEditProduct(product: IProduct): void {
    if (!product) return;

    //assign selected item to form
    const { id, product_name, qty, cost, sub_products } = product;
    this.form.reset();
    this.formSubProdsArr = null;

    this.form.controls['id'].patchValue(id);
    this.form.controls['product_name'].patchValue({ label: product_name, value: id }); // we use an object for passing values to suggestion control
    this.form.controls['qty'].patchValue(qty);
    this.form.controls['cost'].patchValue(cost);
    this.form.controls['sub_products'].patchValue(this.fmtSubProducts(sub_products));

    //structure subproducts
    const subProducts = this.fmtSubProducts(sub_products);
    this.formSubProdsArr = this.form.get('sub_products') as FormArray;
    if (this.formSubProdsArr) this.formSubProdsArr.clear();

    subProducts && subProducts.forEach(subItem => {
      const item = this.createSubItem({
        id: subItem.id,
        product_name: { label: subItem.product_name, value: subItem.id },  // we use an object for passing values to suggestion control
        qty: subItem.qty,
        cost: subItem.cost
      });
      this.formSubProdsArr.push(item);
    });

    this.hasSubProducts = this.formSubProdsArr && this.formSubProdsArr.length > 0;
    this.isEditProduct = true;
    if (!this.isEditProduct) this.onResetForm();
  }

  public deSelectChange(): void {
    this.onResetForm();
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
    if (this.formSubProdsArr) this.formSubProdsArr.clear();
    this.isEditProduct = false;
  }

  public createItem(item: SimpleItem): FormGroup {
    return this.fb.group(item);
  }

  public createSubItem(item: IProduct): FormGroup {
    return this.fb.group(item);
  }

  public onRemove(id: string): void {
    const i = this.productPillsArr.findIndex(x => x.id === id);
    this.productPillsArr.splice(i);
  }

  public onShowSubProduct(): void {
    if (!this.formSubProdsArr || this.formSubProdsArr.length === 0) {
      this.onAddSubProduct();
    } else {
      this.formSubProdsArr.clear();
      this.form.controls['cost'].setErrors(null);
    }
    this.hasSubProducts = !this.hasSubProducts;

  }

  public onAddSubProduct(): void {
    const item: IProduct = Object.assign([], this.form.value);
    this.formSubProdsArr = this.form.get('sub_products') as FormArray;

    const result = this.createSubItem({
      product_name: this.fmtProductName(item.product_name),
      qty: this.form.get('qty').value,
      cost: 1,
    });
    this.formSubProdsArr.push(result);
    this.cdRef.detectChanges();
  }

  public onRemoveProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, { width: '410px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let toRemove: IContractProduct;
        this.$contractProducts.subscribe(p => {
          toRemove = p.filter(p => p.id === product.id)[0];
          const index = p.indexOf(toRemove);
          if (index > -1) {
            p.splice(index, 1);
          }
        })
        /* remote product from the database */
        if (toRemove)
          this.store.dispatch(deleteContractProduct({ id: toRemove.id }));

        this.onResetForm();
      }
    });
  }

  public onRemoveSubProduct(product: IProduct, i?: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, { width: '410px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        //remove item from form array
        const item = this.form.get('sub_products') as FormArray;
        item.removeAt(i);

        /* collect the contract product to be removed */
        let toRemove: IContractProduct;
        this.$contractProducts.subscribe(p => {
          p.forEach(p => {
            p.sub_products.forEach(sp => {
              if (sp.id === product.id) {
                const index = p.sub_products.indexOf(sp);
                if (index > -1) {
                  p.sub_products.splice(index, 1);
                  toRemove = sp;
                }
                return;
              }
            });
          });
        })
        /* remote sub product from the database */
        if (toRemove) {
          this.store.dispatch(deleteContractProduct({ id: toRemove.id }));

          this.onResetForm();
        }
      }
    });
  }
}

