import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filters2Component } from './filters2.component';

describe('Filters2Component', () => {
    let component: Filters2Component;
    let fixture: ComponentFixture<Filters2Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Filters2Component]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Filters2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
