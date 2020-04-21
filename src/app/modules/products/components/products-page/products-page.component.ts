import { IProduct } from './../../../contracts/contract.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})

export class ProductsPageComponent implements OnInit {
  public products: IProduct[] = [
    {
      id: 'b6a9010e-b655-455d-96aa-3dbfba3b759f',
      product_name: 'Canhui toys limited ',
      qty: 1,
      cost: 1,
      sub_products: [
        {
          id: 'b6a9010e-b655-455d-96aa-3dbfba3b457',
          product_name: 'Touch Dimmer Switch',
          qty: 1,
          cost: 1,
        },
        {
          id: 'b6a9010e-b655-455d-96aa-3dbfba3b7234',
          product_name: 'Touch Dimmer Switch 1G1',
          qty: 1,
          cost: 1,
        }
      ]
    }
  ];
  public cols: Array<{ label: string, width?: string | number }> = [
    {
      label: 'Product name',
      width: 37.5
    },
    {
      label: 'Related products',
      width: 31
    },
    {
      label: 'Qty',
      width: '100px'
    },
    {
      label: 'Cost',
      width: '100px'
    },
    {
      label: '',
    }
  ];


  constructor() { }

  ngOnInit() { }
}
