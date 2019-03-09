import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddressFormPage } from './order-address-form.page';

describe('OrderAddressFormPage', () => {
  let component: OrderAddressFormPage;
  let fixture: ComponentFixture<OrderAddressFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddressFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddressFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
