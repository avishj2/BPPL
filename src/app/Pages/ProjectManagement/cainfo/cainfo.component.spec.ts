import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAInfoComponent } from './cainfo.component';

describe('CAInfoComponent', () => {
  let component: CAInfoComponent;
  let fixture: ComponentFixture<CAInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CAInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CAInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
