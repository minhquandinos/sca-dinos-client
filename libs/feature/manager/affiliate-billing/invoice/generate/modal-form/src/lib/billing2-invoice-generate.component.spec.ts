import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billing2InvoiceGenerateComponent } from './billing2-invoice-generate.component';

describe('Billing2InvoiceCreateComponent', () => {
    let component: Billing2InvoiceGenerateComponent;
    let fixture: ComponentFixture<Billing2InvoiceGenerateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Billing2InvoiceGenerateComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Billing2InvoiceGenerateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
