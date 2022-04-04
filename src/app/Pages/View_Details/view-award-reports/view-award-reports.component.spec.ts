import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAwardReportsComponent } from './view-award-reports.component';

describe('ViewAwardReportsComponent', () => {
  let component: ViewAwardReportsComponent;
  let fixture: ComponentFixture<ViewAwardReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAwardReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAwardReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
