import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSimpleTableColComponent } from './ui-simple-table-col.component';

describe('UiSimpleTableColComponent', () => {
    let component: UiSimpleTableColComponent;
    let fixture: ComponentFixture<UiSimpleTableColComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UiSimpleTableColComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiSimpleTableColComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
