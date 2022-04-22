import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNoticedeatilsComponent } from './view-noticedeatils.component';

describe('ViewNoticedeatilsComponent', () => {
  let component: ViewNoticedeatilsComponent;
  let fixture: ComponentFixture<ViewNoticedeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNoticedeatilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNoticedeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
