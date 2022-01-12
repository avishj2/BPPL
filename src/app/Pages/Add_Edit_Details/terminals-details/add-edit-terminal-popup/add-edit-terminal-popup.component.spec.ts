import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTerminalPopupComponent } from './add-edit-terminal-popup.component';

describe('AddEditTerminalPopupComponent', () => {
  let component: AddEditTerminalPopupComponent;
  let fixture: ComponentFixture<AddEditTerminalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTerminalPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTerminalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
