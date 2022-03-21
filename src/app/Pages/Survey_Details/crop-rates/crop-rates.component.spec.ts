import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropRatesComponent } from './crop-rates.component';

describe('CropRatesComponent', () => {
  let component: CropRatesComponent;
  let fixture: ComponentFixture<CropRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
