import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoHeaderComponent } from './detail-info-header.component';

describe('DetailInfoHeaderComponent', () => {
    let component: DetailInfoHeaderComponent;
    let fixture: ComponentFixture<DetailInfoHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailInfoHeaderComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailInfoHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
