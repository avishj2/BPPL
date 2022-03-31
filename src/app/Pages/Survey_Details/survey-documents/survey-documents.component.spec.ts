import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDocumentsComponent } from './survey-documents.component';

describe('SurveyDocumentsComponent', () => {
  let component: SurveyDocumentsComponent;
  let fixture: ComponentFixture<SurveyDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
