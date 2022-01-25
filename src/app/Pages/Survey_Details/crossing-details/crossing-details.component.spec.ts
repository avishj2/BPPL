import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossingDetailsComponent } from './crossing-details.component';

describe('CrossingDetailsComponent', () => {
  let component: CrossingDetailsComponent;
  let fixture: ComponentFixture<CrossingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
