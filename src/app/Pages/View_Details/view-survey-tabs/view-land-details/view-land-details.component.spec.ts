import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLandDetailsComponent } from './view-land-details.component';

describe('ViewLandDetailsComponent', () => {
  let component: ViewLandDetailsComponent;
  let fixture: ComponentFixture<ViewLandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLandDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
