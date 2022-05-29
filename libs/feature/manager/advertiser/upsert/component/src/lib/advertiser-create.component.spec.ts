import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdvertiserCreateComponent } from './advertiser-create.component';

describe('AdvertiserCreateComponent', () => {
    let component: AdvertiserCreateComponent;
    let fixture: ComponentFixture<AdvertiserCreateComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [AdvertiserCreateComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertiserCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
