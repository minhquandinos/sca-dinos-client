import { Injectable } from '@angular/core';

import { ShortResponseInterface } from '@scaleo/core/data';
import { RestApiService } from '@scaleo/core/rest-api/service';

import { BaseFindService } from '../../services/base-find.service';

@Injectable()
export class FindSmartLinkService extends BaseFindService<ShortResponseInterface> {
    constructor(protected rest: RestApiService) {
        super(rest, 'smart-links', 'smart-links');
    }
}
