import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billing2InvoiceAdvanceComponent } from './billing2-invoice-advance.component';

describe('Billing2InvoiceAdvanceComponent', () => {
    let component: Billing2InvoiceAdvanceComponent;
    let fixture: ComponentFixture<Billing2InvoiceAdvanceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Billing2InvoiceAdvanceComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Billing2InvoiceAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
