import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSurveyTabsComponent } from './view-survey-tabs.component';

describe('ViewSurveyTabsComponent', () => {
  let component: ViewSurveyTabsComponent;
  let fixture: ComponentFixture<ViewSurveyTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSurveyTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSurveyTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
