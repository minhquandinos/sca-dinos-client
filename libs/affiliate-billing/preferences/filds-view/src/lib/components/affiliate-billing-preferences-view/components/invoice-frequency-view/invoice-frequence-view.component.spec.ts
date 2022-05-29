import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFrequencyViewComponent } from './invoice-frequency-view.component';

describe('InvoiceFrequenceViewComponent', () => {
    let component: InvoiceFrequencyViewComponent;
    let fixture: ComponentFixture<InvoiceFrequencyViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InvoiceFrequencyViewComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InvoiceFrequencyViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
