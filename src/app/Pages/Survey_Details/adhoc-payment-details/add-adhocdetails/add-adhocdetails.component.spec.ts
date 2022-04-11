import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdhocdetailsComponent } from './add-adhocdetails.component';

describe('AddAdhocdetailsComponent', () => {
  let component: AddAdhocdetailsComponent;
  let fixture: ComponentFixture<AddAdhocdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdhocdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdhocdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
