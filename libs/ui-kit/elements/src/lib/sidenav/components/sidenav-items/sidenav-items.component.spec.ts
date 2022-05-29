import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavItemsComponent } from './sidenav-items.component';

describe('SidenavItemsComponent', () => {
  let component: SidenavItemsComponent;
  let fixture: ComponentFixture<SidenavItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
