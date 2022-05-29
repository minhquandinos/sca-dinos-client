import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLandingPageComponent } from './find-landing-page.component';

describe('FindLandingPageComponent', () => {
  let component: FindLandingPageComponent;
  let fixture: ComponentFixture<FindLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
