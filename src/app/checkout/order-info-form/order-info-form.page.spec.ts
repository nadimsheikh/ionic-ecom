import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoFormPage } from './order-info-form.page';

describe('OrderInfoFormPage', () => {
  let component: OrderInfoFormPage;
  let fixture: ComponentFixture<OrderInfoFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInfoFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInfoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
