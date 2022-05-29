import { TestBed } from '@angular/core/testing';

import { Filters2Service } from './filters2.service';

describe('Filters2Service', () => {
    let service: Filters2Service;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(Filters2Service);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
