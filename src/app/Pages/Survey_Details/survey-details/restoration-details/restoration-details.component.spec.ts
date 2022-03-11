import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorationDetailsComponent } from './restoration-details.component';

describe('RestorationDetailsComponent', () => {
  let component: RestorationDetailsComponent;
  let fixture: ComponentFixture<RestorationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestorationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
