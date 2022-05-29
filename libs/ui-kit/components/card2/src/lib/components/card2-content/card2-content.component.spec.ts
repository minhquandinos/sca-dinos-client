import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card2ContentComponent } from './card2-content.component';

describe('Card2ContentComponent', () => {
  let component: Card2ContentComponent;
  let fixture: ComponentFixture<Card2ContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card2ContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card2ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
