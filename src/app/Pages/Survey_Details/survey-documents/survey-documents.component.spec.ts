import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { SurveyDocumentsComponent } from './survey-documents.component';

describe('SurveyDocumentsComponent', () => {
  let component: SurveyDocumentsComponent;
  let fixture: ComponentFixture<SurveyDocumentsComponent>;

  beforeEach(waitForAsync(() => {
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
