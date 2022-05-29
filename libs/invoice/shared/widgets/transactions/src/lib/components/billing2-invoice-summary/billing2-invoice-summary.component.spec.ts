import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billing2InvoiceSummaryComponent } from './billing2-invoice-summary.component';

describe('BillingInvoiceSummaryComponent', () => {
    let component: Billing2InvoiceSummaryComponent;
    let fixture: ComponentFixture<Billing2InvoiceSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Billing2InvoiceSummaryComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Billing2InvoiceSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
