import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOMappingComponent } from './somapping.component';

describe('SOMappingComponent', () => {
  let component: SOMappingComponent;
  let fixture: ComponentFixture<SOMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SOMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SOMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
