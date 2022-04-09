import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LAQPermanentComponent } from './laqpermanent.component';

describe('LAQPermanentComponent', () => {
  let component: LAQPermanentComponent;
  let fixture: ComponentFixture<LAQPermanentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LAQPermanentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LAQPermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
