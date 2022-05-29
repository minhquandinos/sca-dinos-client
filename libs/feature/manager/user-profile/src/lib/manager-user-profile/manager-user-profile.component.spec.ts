import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUserProfileComponent } from './manager-user-profile.component';

describe('ManagerUserProfileComponent', () => {
  let component: ManagerUserProfileComponent;
  let fixture: ComponentFixture<ManagerUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
