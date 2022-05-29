import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoRowComponent } from './detail-info-row.component';

describe('DetailInfoRowComponent', () => {
    let component: DetailInfoRowComponent;
    let fixture: ComponentFixture<DetailInfoRowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailInfoRowComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailInfoRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
