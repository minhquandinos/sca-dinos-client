import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateConfigLayoutComponent } from './affiliate-config-layout.component';

describe('AffiliateConfigLayoutComponent', () => {
    let component: AffiliateConfigLayoutComponent;
    let fixture: ComponentFixture<AffiliateConfigLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AffiliateConfigLayoutComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AffiliateConfigLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
