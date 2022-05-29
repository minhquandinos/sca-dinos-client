import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSimpleTableRowComponent } from './ui-simple-table-row.component';

describe('UiSimpleTableRowComponent', () => {
    let component: UiSimpleTableRowComponent;
    let fixture: ComponentFixture<UiSimpleTableRowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UiSimpleTableRowComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiSimpleTableRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
