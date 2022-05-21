import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerNocDetailsComponent } from './farmer-noc-details.component';

describe('FarmerNocDetailsComponent', () => {
  let component: FarmerNocDetailsComponent;
  let fixture: ComponentFixture<FarmerNocDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerNocDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerNocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
