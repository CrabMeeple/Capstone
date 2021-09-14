import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceFormEditComponent } from './race-form-edit.component';

describe('RaceFormEditComponent', () => {
  let component: RaceFormEditComponent;
  let fixture: ComponentFixture<RaceFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
