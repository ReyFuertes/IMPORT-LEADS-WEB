import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'il-contract-detail-products',
  templateUrl: './contract-detail-products.component.html',
  styleUrls: ['./contract-detail-products.component.scss']
})

export class ContractDetailProductsComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public items: Array<{ name: string, qty?: string | number, cost?: string | number }> = [
    {
      name: 'Touch Dimmer Switch',
      qty: 1,
      cost: 1
    },
    {
      name: 'Touch Dimmer Switch > 1G1W 1283',
      qty: 1,
      cost: 1
    },
    {
      name: 'Touch Dimmer Switch > 2G1W 1306',
      qty: 1,
      cost: 1
    },
    {
      name: 'Touch Dimmer Switch',
      qty: 1,
      cost: 1
    },
    {
      name: 'Touch Dimmer Switch > 1G1W 1283',
      qty: 1,
      cost: 1
    },
    {
      name: 'Touch Dimmer Switch > 2G1W 1306',
      qty: 1,
      cost: 1
    }
  ];
  public products: FormArray;
  public form: FormGroup;
  public formProducts: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      qty: [null],
      cost: [null]
    });
    this.formProducts = this.fb.group({
      products: this.fb.array([...this.items])
    });
  }

  ngOnInit() { }

  public createItem(item: { name: string, qty?: string | number, cost?: string | number }): FormGroup {
    return this.fb.group(item);
  }

  public addProduct(): void {
    if (this.form.value) {
      this.products = this.formProducts.get('products') as FormArray;
      this.products.push(this.createItem(this.form.value));
      this.form.reset();
    }
  }
}
