import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocPaymentDetailsComponent } from './adhoc-payment-details.component';

describe('AdhocPaymentDetailsComponent', () => {
  let component: AdhocPaymentDetailsComponent;
  let fixture: ComponentFixture<AdhocPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhocPaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
