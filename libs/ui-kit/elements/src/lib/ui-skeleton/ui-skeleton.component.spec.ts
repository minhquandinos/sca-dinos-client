import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UiSkeletonComponent } from './ui-skeleton.component';

describe('UiSkeletonComponent', () => {
    let component: UiSkeletonComponent;
    let fixture: ComponentFixture<UiSkeletonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [UiSkeletonComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(UiSkeletonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
