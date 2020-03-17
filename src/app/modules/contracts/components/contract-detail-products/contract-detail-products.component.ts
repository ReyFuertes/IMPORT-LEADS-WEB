import { SimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'il-contract-detail-products',
  templateUrl: './contract-detail-products.component.html',
  styleUrls: ['./contract-detail-products.component.scss']
})

export class ContractDetailProductsComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public productsArray: FormArray;
  public subProductsArray: FormArray;
  public productSubProductsArray: FormArray;
  public form: FormGroup;
  public formProducts: FormGroup;
  public formProductSet: FormGroup;
  public hasSubProducts: boolean = false;
  private destroy$ = new Subject();

  @Input()
  public isRightNavOpen: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      name: ['Product 1', Validators.required],
      qty: [1, Validators.required],
      cost: [1, Validators.required],
      subProducts: new FormArray([]),
    });
    this.formProducts = this.fb.group({
      products: new FormArray([]),
    });

    //get the sub total of all productSet
    this.form.get('subProducts')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(subProducts => {
        const totalValueOfSubProducts = subProducts.reduce((sum, current) => parseInt(sum) + parseInt(current.cost), 0);
        const valueOfParentProduct = this.form.get('cost').value;
        console.log(parseInt(totalValueOfSubProducts), parseInt(valueOfParentProduct));
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

  ngOnInit() {
    //just a dummy product default value
    this.setProduct({
      label: 'Touch Dimmer Switch',
      value: 'Touch Dimmer Switch'
    });
  }
  ngOnChanges() {
    this.isRightNavOpen = this.isRightNavOpen;
  }

  public setProduct(item: SimpleItem): void {
    let formMembers = (<FormArray>this.formProducts.get('products')).controls;
    formMembers.push(this.fb.group(item));
  }

  public onRemove(id: number): void {
    const productsArray = this.formProducts.get('products') as FormArray;
    const i = productsArray.controls.findIndex(x => x.value === id);
    productsArray.removeAt(i);
  }

  public createItem(item: SimpleItem): FormGroup {
    return this.fb.group(item);
  }

  public createSubItem(item: any): FormGroup {
    return this.fb.group(item);
  }

  public addProductToPills(): void {
    if (this.form.value) {
      this.productsArray = this.formProducts.get('products') as FormArray;
      this.productsArray.push(this.createItem({
        label: this.form.value.name,
        value: this.form.value.id
      }));

      //so i created a new FormArray so that i can used it in the html with different properties
      // this.productSubProductsArray = this.formProducts.get('productSubProducts') as FormArray;
      // this.subProductsArray && this.subProductsArray.value.forEach(subProduct => {
      //   this.productSubProductsArray.push(this.createItem({
      //     label: subProduct.name,
      //     value: Math.floor(Math.random() * 10).toString()
      //   }));
      // });

      this.form.reset();
      // this.hasSubProducts = false;
      // this.subProductsArray.clear();
    }
  }

  public onShowSubProduct() {
    //add one product as a default row
    if (!this.subProductsArray) this.onAddSubProduct();
    this.hasSubProducts = !this.hasSubProducts;
  }

  public onAddSubProduct() {
    this.subProductsArray = this.form.get('subProducts') as FormArray;
    const item = this.createSubItem({
      name: '',
      qty: 1,
      cost: 1,
    })
    this.subProductsArray.push(item);
  }

  public onRemoveSubProduct(index: number) {
    const subProduct = this.form.get('subProducts') as FormArray;
    if (subProduct.length > 1) {
      subProduct.removeAt(index);
    }
  }
}
