import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFarmerNocComponent } from './view-farmer-noc.component';

describe('ViewFarmerNocComponent', () => {
  let component: ViewFarmerNocComponent;
  let fixture: ComponentFixture<ViewFarmerNocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFarmerNocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFarmerNocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
