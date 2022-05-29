import { TestBed } from '@angular/core/testing';

import { UiDropdownContentService } from './ui-dropdown-content.service';

describe('UiDropdownContentService', () => {
    let service: UiDropdownContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UiDropdownContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
