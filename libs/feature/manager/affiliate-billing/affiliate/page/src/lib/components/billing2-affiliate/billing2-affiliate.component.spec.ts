import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billing2AffiliateComponent } from './billing2-affiliate.component';

describe('Billing2AffiliateComponent', () => {
    let component: Billing2AffiliateComponent;
    let fixture: ComponentFixture<Billing2AffiliateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Billing2AffiliateComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Billing2AffiliateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
