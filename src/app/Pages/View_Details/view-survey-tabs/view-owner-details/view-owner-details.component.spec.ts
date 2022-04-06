import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnerDetailsComponent } from './view-owner-details.component';

describe('ViewOwnerDetailsComponent', () => {
  let component: ViewOwnerDetailsComponent;
  let fixture: ComponentFixture<ViewOwnerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOwnerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
