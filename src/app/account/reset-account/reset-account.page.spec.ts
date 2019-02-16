import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetAccountPage } from './reset-account.page';

describe('ResetAccountPage', () => {
  let component: ResetAccountPage;
  let fixture: ComponentFixture<ResetAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
