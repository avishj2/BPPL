import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcGISMapComponent } from './arc-gismap.component';

describe('ArcGISMapComponent', () => {
  let component: ArcGISMapComponent;
  let fixture: ComponentFixture<ArcGISMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcGISMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcGISMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
