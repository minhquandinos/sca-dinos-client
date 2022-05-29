import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billing2InvoiceAdjustmentComponent } from './billing2-invoice-adjustment.component';

describe('Billing2InvoiceAdditionalAmountComponent', () => {
    let component: Billing2InvoiceAdjustmentComponent;
    let fixture: ComponentFixture<Billing2InvoiceAdjustmentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Billing2InvoiceAdjustmentComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Billing2InvoiceAdjustmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
