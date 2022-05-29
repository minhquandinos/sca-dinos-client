import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoColComponent } from './detail-info-col.component';

describe('DetailInfoColComponent', () => {
    let component: DetailInfoColComponent;
    let fixture: ComponentFixture<DetailInfoColComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailInfoColComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailInfoColComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
