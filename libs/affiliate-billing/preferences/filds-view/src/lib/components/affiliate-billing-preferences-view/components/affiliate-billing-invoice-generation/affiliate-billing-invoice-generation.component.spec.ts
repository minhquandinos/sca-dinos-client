import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateBillingInvoiceGenerationComponent } from './affiliate-billing-invoice-generation.component';

describe('AffiliateBillingInvoiceGenerationComponent', () => {
    let component: AffiliateBillingInvoiceGenerationComponent;
    let fixture: ComponentFixture<AffiliateBillingInvoiceGenerationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AffiliateBillingInvoiceGenerationComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AffiliateBillingInvoiceGenerationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
