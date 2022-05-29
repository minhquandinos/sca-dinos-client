import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card2HeaderComponent } from './card2-header.component';

describe('Card2HeaderComponent', () => {
  let component: Card2HeaderComponent;
  let fixture: ComponentFixture<Card2HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card2HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card2HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
