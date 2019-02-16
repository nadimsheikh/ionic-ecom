import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetContactPage } from './reset-contact.page';

describe('ResetContactPage', () => {
  let component: ResetContactPage;
  let fixture: ComponentFixture<ResetContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetContactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
