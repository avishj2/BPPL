import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectReportsComponent } from './view-project-reports.component';

describe('ViewProjectReportsComponent', () => {
  let component: ViewProjectReportsComponent;
  let fixture: ComponentFixture<ViewProjectReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
