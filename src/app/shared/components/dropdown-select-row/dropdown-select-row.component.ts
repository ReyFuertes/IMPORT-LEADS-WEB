import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-dropdown-select-row',
  templateUrl: './dropdown-select-row.component.html',
  styleUrls: ['./dropdown-select-row.component.scss']
})

export class DropdownSelectRowComponent implements OnInit {
  cars: any[];
  selectedCar2: string = 'BMW';
  constructor() {

  }

  ngOnInit() {
    this.cars = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
    ];
  }
}
