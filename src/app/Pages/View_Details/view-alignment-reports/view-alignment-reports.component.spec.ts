import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAlignmentReportsComponent } from './view-alignment-reports.component';

describe('ViewAlignmentReportsComponent', () => {
  let component: ViewAlignmentReportsComponent;
  let fixture: ComponentFixture<ViewAlignmentReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAlignmentReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAlignmentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
