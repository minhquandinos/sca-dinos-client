import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListSearchComponent } from './entity-list-search.component';

describe('EntityListSearchComponent', () => {
  let component: EntityListSearchComponent;
  let fixture: ComponentFixture<EntityListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
