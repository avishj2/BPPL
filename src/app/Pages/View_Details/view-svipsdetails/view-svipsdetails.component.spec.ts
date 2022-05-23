import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSVIPSDetailsComponent } from './view-svipsdetails.component';

describe('ViewSVIPSDetailsComponent', () => {
  let component: ViewSVIPSDetailsComponent;
  let fixture: ComponentFixture<ViewSVIPSDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSVIPSDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSVIPSDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
