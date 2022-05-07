import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGazetteComponent } from './view-gazette.component';

describe('ViewGazetteComponent', () => {
  let component: ViewGazetteComponent;
  let fixture: ComponentFixture<ViewGazetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGazetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGazetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
