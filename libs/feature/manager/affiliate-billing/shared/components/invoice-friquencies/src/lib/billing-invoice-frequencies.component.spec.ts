import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingInvoiceFrequenciesComponent } from './billing-invoice-frequencies.component';

describe('BillingInvoiceFrequenciesComponent', () => {
    let component: BillingInvoiceFrequenciesComponent;
    let fixture: ComponentFixture<BillingInvoiceFrequenciesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BillingInvoiceFrequenciesComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BillingInvoiceFrequenciesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
