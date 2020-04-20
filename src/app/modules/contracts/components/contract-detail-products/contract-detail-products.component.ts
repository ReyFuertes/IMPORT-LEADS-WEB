
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
import { take, takeUntil, filter, tap } from 'rxjs/operators';
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
  public subProdsArr: FormArray;
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
          console.log(totalValOfSP, valOfParent)
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
      const payload = this.fmtPayload(this.form.value);

      this.store.dispatch(addContractProducts({ payload }));

      this.onResetForm();
    }
  }

  private fmtPayload(value: any): any {
    const { id, product_name, qty, cost, sub_products } = value;
    return {
      parent: _.pickBy({ id, product_name, qty, cost }, _.identity),
      child: Object.assign([], sub_products),
      contract: this.contract
    }
  }

  public onSave(): void {
    if (this.form.value) {
      const { id } = this.form.value;
      const i = this.productPillsArr.findIndex(x => x.id === id);

      this.productPillsArr[i] = this.form.value;
      this.isEditProduct = !this.isEditProduct;

      this.store.dispatch(updateContractProduct({
        payload: this.fmtPayload(this.form.value)
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
    if (this.subProdsArr) this.subProdsArr.clear();
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

  public OnEditProduct(product: IProduct): void {
    if (!product) return;

    //assign selected item to form
    const { id, product_name, qty, cost, sub_products, cp_id } = product;
    this.form.reset();
    this.subProdsArr = null;

    this.form.controls['id'].patchValue(id);
    this.form.controls['product_name'].patchValue(product_name);
    this.form.controls['qty'].patchValue(qty);
    this.form.controls['cost'].patchValue(cost);
    this.form.controls['sub_products'].patchValue(sub_products);
    this.form.controls['cp_id'].patchValue(cp_id);

    if (sub_products && sub_products.length > 0) {
      this.subProdsArr = this.form.get('sub_products') as FormArray;
      if (this.subProdsArr) this.subProdsArr.clear();

      sub_products && sub_products.forEach(subItem => {
        const item = this.createSubItem({
          id: subItem.id,
          product_name: subItem.product_name,
          qty: subItem.qty,
          cost: subItem.cost,
          cp_id: subItem.cp_id
        });
        this.subProdsArr.push(item);
      });
    }
    this.hasSubProducts = this.subProdsArr && this.subProdsArr.length > 0;
    this.isEditProduct = true;
    if (!this.isEditProduct) this.onResetForm();
  }

  public onShowSubProduct(): void {
    if (!this.subProdsArr || this.subProdsArr.length === 0) {
      this.onAddSubProduct();
    } else {
      this.subProdsArr.clear();
      this.form.controls['cost'].setErrors(null);
    }
    this.hasSubProducts = !this.hasSubProducts;

  }

  public onAddSubProduct(): void {
    const item: IProduct = Object.assign([], this.form.value);
    this.subProdsArr = this.form.get('sub_products') as FormArray;

    const result = this.createSubItem({
      product_name: item.product_name,
      qty: this.form.get('qty').value,
      cost: 1,
    });
    this.subProdsArr.push(result);
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

