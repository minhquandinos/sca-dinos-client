import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DateVariantComponent } from './date-variant.component';

describe('DateVariantComponent', () => {
    let component: DateVariantComponent;
    let fixture: ComponentFixture<DateVariantComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DateVariantComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DateVariantComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
