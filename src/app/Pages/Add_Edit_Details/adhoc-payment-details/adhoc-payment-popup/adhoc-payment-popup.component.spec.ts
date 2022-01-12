import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocPaymentPopupComponent } from './adhoc-payment-popup.component';

describe('AdhocPaymentPopupComponent', () => {
  let component: AdhocPaymentPopupComponent;
  let fixture: ComponentFixture<AdhocPaymentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhocPaymentPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocPaymentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
