import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVillageDetailsComponent } from './view-village-details.component';

describe('ViewVillageDetailsComponent', () => {
  let component: ViewVillageDetailsComponent;
  let fixture: ComponentFixture<ViewVillageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVillageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVillageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
