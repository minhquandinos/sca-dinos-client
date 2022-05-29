import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaps2Component } from './add-caps2.component';

describe('TestExampleComponent', () => {
    let component: AddCaps2Component;
    let fixture: ComponentFixture<AddCaps2Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddCaps2Component]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddCaps2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
