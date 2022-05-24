import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SVIPSDetailsComponent } from './svipsdetails.component';

describe('SVIPSDetailsComponent', () => {
  let component: SVIPSDetailsComponent;
  let fixture: ComponentFixture<SVIPSDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SVIPSDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SVIPSDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
