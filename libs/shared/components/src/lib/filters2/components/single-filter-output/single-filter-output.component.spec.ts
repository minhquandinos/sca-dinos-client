import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFilterOutputComponent } from './single-filter-output.component';

describe('SingleFilterOutputComponent', () => {
    let component: SingleFilterOutputComponent;
    let fixture: ComponentFixture<SingleFilterOutputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleFilterOutputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleFilterOutputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
