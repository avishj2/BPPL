import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCrossingDetailsComponent } from './view-crossing-details.component';

describe('ViewCrossingDetailsComponent', () => {
  let component: ViewCrossingDetailsComponent;
  let fixture: ComponentFixture<ViewCrossingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCrossingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCrossingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
