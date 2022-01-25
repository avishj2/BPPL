import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageDetailsComponent } from './village-details.component';

describe('VillageDetailsComponent', () => {
  let component: VillageDetailsComponent;
  let fixture: ComponentFixture<VillageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
