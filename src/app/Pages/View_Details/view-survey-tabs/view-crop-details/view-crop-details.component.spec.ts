import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCropDetailsComponent } from './view-crop-details.component';

describe('ViewCropDetailsComponent', () => {
  let component: ViewCropDetailsComponent;
  let fixture: ComponentFixture<ViewCropDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCropDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCropDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
