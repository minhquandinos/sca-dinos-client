import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoTitleComponent } from './detail-info-title.component';

describe('DetailInfoTitleComponent', () => {
    let component: DetailInfoTitleComponent;
    let fixture: ComponentFixture<DetailInfoTitleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailInfoTitleComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailInfoTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
