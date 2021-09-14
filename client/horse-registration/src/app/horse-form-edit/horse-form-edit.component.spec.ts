import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseFormEditComponent } from './horse-form-edit.component';

describe('HorseFormEditComponent', () => {
  let component: HorseFormEditComponent;
  let fixture: ComponentFixture<HorseFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorseFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
