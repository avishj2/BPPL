import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalsDetailsComponent } from './terminals-details.component';

describe('TerminalsDetailsComponent', () => {
  let component: TerminalsDetailsComponent;
  let fixture: ComponentFixture<TerminalsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
