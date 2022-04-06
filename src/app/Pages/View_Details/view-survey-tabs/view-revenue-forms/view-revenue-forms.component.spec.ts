import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevenueFormsComponent } from './view-revenue-forms.component';

describe('ViewRevenueFormsComponent', () => {
  let component: ViewRevenueFormsComponent;
  let fixture: ComponentFixture<ViewRevenueFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRevenueFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevenueFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
