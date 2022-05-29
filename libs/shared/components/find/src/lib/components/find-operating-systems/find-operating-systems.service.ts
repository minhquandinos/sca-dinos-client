import { Injectable } from '@angular/core';

import { ShortResponseInterface } from '@scaleo/core/data';
import { RestApiService } from '@scaleo/core/rest-api/service';

import { BaseFindService } from '../../services/base-find.service';

@Injectable({
    providedIn: 'root'
})
export class FindOperatingSystemsService extends BaseFindService<ShortResponseInterface> {
    constructor(protected rest: RestApiService) {
        super(rest, 'operating-systems-get-filter-info', 'operating-systems');
    }
}
