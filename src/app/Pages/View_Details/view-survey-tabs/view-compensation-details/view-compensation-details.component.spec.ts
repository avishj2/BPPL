import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompensationDetailsComponent } from './view-compensation-details.component';

describe('ViewCompensationDetailsComponent', () => {
  let component: ViewCompensationDetailsComponent;
  let fixture: ComponentFixture<ViewCompensationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompensationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompensationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
