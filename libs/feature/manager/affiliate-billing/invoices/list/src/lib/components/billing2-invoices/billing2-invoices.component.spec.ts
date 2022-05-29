import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billing2InvoicesComponent } from './billing2-invoices.component';

describe('Billing2InvoicesComponent', () => {
    let component: Billing2InvoicesComponent;
    let fixture: ComponentFixture<Billing2InvoicesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Billing2InvoicesComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Billing2InvoicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
