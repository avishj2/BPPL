import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentsheettestComponent } from './alignmentsheettest.component';

describe('AlignmentsheettestComponent', () => {
  let component: AlignmentsheettestComponent;
  let fixture: ComponentFixture<AlignmentsheettestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlignmentsheettestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlignmentsheettestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
