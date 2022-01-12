import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVillagePopupComponent } from './add-edit-village-popup.component';

describe('AddEditVillagePopupComponent', () => {
  let component: AddEditVillagePopupComponent;
  let fixture: ComponentFixture<AddEditVillagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditVillagePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVillagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
