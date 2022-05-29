import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billing2InvoiceTransactionsCardComponent } from './billing2-invoice-transactions-card.component';

describe('Billing2InvoiceItemsComponent', () => {
    let component: Billing2InvoiceTransactionsCardComponent;
    let fixture: ComponentFixture<Billing2InvoiceTransactionsCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Billing2InvoiceTransactionsCardComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Billing2InvoiceTransactionsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
