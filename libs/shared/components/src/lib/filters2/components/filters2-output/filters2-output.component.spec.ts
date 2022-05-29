import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filters2OutputComponent } from './filters2-output.component';

describe('Filters2OutputComponent', () => {
    let component: Filters2OutputComponent;
    let fixture: ComponentFixture<Filters2OutputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Filters2OutputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Filters2OutputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
