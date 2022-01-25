import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEngineeringComponent } from './pre-engineering.component';

describe('PreEngineeringComponent', () => {
  let component: PreEngineeringComponent;
  let fixture: ComponentFixture<PreEngineeringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreEngineeringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreEngineeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
