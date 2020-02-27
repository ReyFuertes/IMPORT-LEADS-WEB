import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMultiSelectComponent } from './dropdown-multi-select.component';

describe('DropdownMultiSelectComponent', () => {
  let component: DropdownMultiSelectComponent;
  let fixture: ComponentFixture<DropdownMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
