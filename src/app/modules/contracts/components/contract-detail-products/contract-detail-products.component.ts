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
  public subProducts: FormArray;
  public form: FormGroup;
  public formProducts: FormGroup;
  public formSubProducts: FormGroup;
  public hasSubProducts: boolean = false;
  private destroy$ = new Subject();

  @Input()
  public isRightNavOpen: boolean = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      qty: [null, Validators.required],
      cost: [null, Validators.required]
    });
    this.formProducts = this.fb.group({
      products: new FormArray([]),
      subProducts: new FormArray([]),
    });
    //we separate the sub products, maybe later we will joing this with the products above
    this.formSubProducts = this.fb.group({
      subProducts: this.fb.array([])
    });
    //get the sub total of all produects
    this.formSubProducts.get('subProducts')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(subProducts => {
        const totalValueOfSubProducts = subProducts.reduce((sum, current) => parseInt(sum) + parseInt(current.cost), 0);
        const valueOfParentProduct = this.form.get('cost').value;

        //if the value of input is less than the value of sub products cost total, mark as invalid error
        if(parseInt(totalValueOfSubProducts) !== parseInt(valueOfParentProduct)) {
          this.form.controls['cost'].setErrors({'invalid': true});
        } else {
          this.form.controls['cost'].setErrors(null);
        }
      })
    //just a dummy product default value
    this.setProduct({
      label: 'Touch Dimmer Switch',
      value: 'Touch Dimmer Switch'
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  ngOnInit() { }
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

  public addProduct(): void {
    if (this.form.value) {
      this.productsArray = this.formProducts.get('products') as FormArray;
      const item = this.createItem({
        label: this.form.value.name,
        value: this.form.value.id
      });
      this.productsArray.push(item);
      this.form.reset();
    }
  }

  public onShowSubProduct() {
    if (!this.subProducts) this.onAddSubProduct();
    this.hasSubProducts = !this.hasSubProducts;
  }

  public onAddSubProduct() {
    this.subProducts = this.formSubProducts.get('subProducts') as FormArray;
    const item = this.createSubItem({
      name: '',
      qty: 0,
      cost: 0,
    })
    this.subProducts.push(item);
  }

  public onRemoveSubProduct(index: number) {
    const members = this.formSubProducts.get('subProducts') as FormArray;
    if (members.length > 1) {
      members.removeAt(index);
    }
  }
}
