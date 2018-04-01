import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListPopupComponent } from './add-list-popup.component';

describe('AddListPopupComponent', () => {
  let component: AddListPopupComponent;
  let fixture: ComponentFixture<AddListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
