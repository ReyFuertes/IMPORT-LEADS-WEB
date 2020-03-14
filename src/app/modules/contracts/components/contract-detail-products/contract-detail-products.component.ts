import { SimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'il-contract-detail-products',
  templateUrl: './contract-detail-products.component.html',
  styleUrls: ['./contract-detail-products.component.scss']
})

export class ContractDetailProductsComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public products: FormArray;
  public form: FormGroup;
  public formProducts: FormGroup;
  public subProducts: number[] = [1];
  public isSubProduct: boolean = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      qty: [null, Validators.required],
      cost: [null, Validators.required]
    });
    this.formProducts = this.fb.group({
      products: new FormArray([])
    });

    this.setProduct({
      label: 'Touch Dimmer Switch',
      value: 'Touch Dimmer Switch'
    });
  }

  ngOnInit() {

  }

  public setProduct(item: SimpleItem): void {
    let formMembers = (<FormArray>this.formProducts.get('products')).controls;
    formMembers.push(this.fb.group(item));
  }

  public onRemove(id: number): void {
    const products = this.formProducts.get('products') as FormArray;
    const i = products.controls.findIndex(x => x.value === id);
    products.removeAt(i);
  }

  public createItem(item: SimpleItem): FormGroup {
    return this.fb.group(item);
  }

  public addProduct(): void {
    if (this.form.value) {
      this.products = this.formProducts.get('products') as FormArray;
      this.products.push(this.createItem({
        label: this.form.value.name,
        value: this.form.value.id
      }));
      this.form.reset();
    }
  }

  public onShowSubProduct() {
    this.isSubProduct = !this.isSubProduct;
  }

  public onAddSubProduct() {
    this.subProducts.push(1);
  }

  public onRemoveSubProduct(index: number) {

    if (this.subProducts.length > 1) {
      this.subProducts.splice(index, 1);
    }
  }
}
