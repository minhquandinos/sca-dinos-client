import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AffiliatesComponent } from './affiliates.component';

describe('AffiliatesComponent', () => {
    let component: AffiliatesComponent;
    let fixture: ComponentFixture<AffiliatesComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [AffiliatesComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AffiliatesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
