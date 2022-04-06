import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTreeDetailsComponent } from './view-tree-details.component';

describe('ViewTreeDetailsComponent', () => {
  let component: ViewTreeDetailsComponent;
  let fixture: ComponentFixture<ViewTreeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTreeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTreeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
