import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { GazetteDetailsComponent } from './gazette-details.component';

describe('GazetteDetailsComponent', () => {
  let component: GazetteDetailsComponent;
  let fixture: ComponentFixture<GazetteDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GazetteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GazetteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
