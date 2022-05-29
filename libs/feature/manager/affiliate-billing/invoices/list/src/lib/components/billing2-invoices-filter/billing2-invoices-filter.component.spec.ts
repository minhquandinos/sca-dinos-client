import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billing2InvoicesFilterComponent } from './billing2-invoices-filter.component';

describe('Billing2InvoicesFilterComponent', () => {
    let component: Billing2InvoicesFilterComponent;
    let fixture: ComponentFixture<Billing2InvoicesFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Billing2InvoicesFilterComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Billing2InvoicesFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
