import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card2TitleComponent } from './card2-title.component';

describe('Card2TitleComponent', () => {
  let component: Card2TitleComponent;
  let fixture: ComponentFixture<Card2TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card2TitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card2TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
