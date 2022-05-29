import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateBillingPreferencesViewComponent } from './affiliate-billing-preferences-view.component';

describe('AffiliateDetailBilling2EditComponent', () => {
    let component: AffiliateBillingPreferencesViewComponent;
    let fixture: ComponentFixture<AffiliateBillingPreferencesViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AffiliateBillingPreferencesViewComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AffiliateBillingPreferencesViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
