import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GazetteNoticeDetailsComponent } from './gazette-notice-details.component';

describe('GazetteNoticeDetailsComponent', () => {
  let component: GazetteNoticeDetailsComponent;
  let fixture: ComponentFixture<GazetteNoticeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GazetteNoticeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GazetteNoticeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
