import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OLGSPageComponent } from './olgspage.component';

describe('OLGSPageComponent', () => {
  let component: OLGSPageComponent;
  let fixture: ComponentFixture<OLGSPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OLGSPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OLGSPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
