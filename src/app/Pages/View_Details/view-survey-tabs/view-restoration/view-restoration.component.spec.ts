import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestorationComponent } from './view-restoration.component';

describe('ViewRestorationComponent', () => {
  let component: ViewRestorationComponent;
  let fixture: ComponentFixture<ViewRestorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRestorationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRestorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
