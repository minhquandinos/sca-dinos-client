import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AffiliateCreateComponent } from './affiliate-create.component';

describe('AffiliateCreateComponent', () => {
    let component: AffiliateCreateComponent;
    let fixture: ComponentFixture<AffiliateCreateComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [AffiliateCreateComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AffiliateCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
