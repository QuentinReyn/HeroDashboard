import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponAddComponent } from './weapon-add.component';

describe('WeaponAddComponent', () => {
  let component: WeaponAddComponent;
  let fixture: ComponentFixture<WeaponAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
