import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildViewCrossingComponent } from './child-view-crossing.component';

describe('ChildViewCrossingComponent', () => {
  let component: ChildViewCrossingComponent;
  let fixture: ComponentFixture<ChildViewCrossingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildViewCrossingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildViewCrossingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
