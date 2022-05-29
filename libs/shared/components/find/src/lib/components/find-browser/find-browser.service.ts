import { Injectable } from '@angular/core';

import { ShortResponseInterface } from '@scaleo/core/data';
import { RestApiService } from '@scaleo/core/rest-api/service';

import { BaseFindService } from '../../services/base-find.service';

@Injectable({ providedIn: 'root' })
export class FindBrowserService extends BaseFindService<ShortResponseInterface> {
    constructor(protected rest: RestApiService) {
        super(rest, 'browsers-get-filter-info', 'browsers');
    }
}
