import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filter2PopupComponent } from './filter2-popup.component';

describe('Filter2PopupComponent', () => {
    let component: Filter2PopupComponent;
    let fixture: ComponentFixture<Filter2PopupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Filter2PopupComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Filter2PopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
