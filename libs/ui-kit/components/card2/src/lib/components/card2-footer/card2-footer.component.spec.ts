import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card2FooterComponent } from './card2-footer.component';

describe('Card2FooterComponent', () => {
  let component: Card2FooterComponent;
  let fixture: ComponentFixture<Card2FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card2FooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Card2FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
