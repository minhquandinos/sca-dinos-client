import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { AffiliateListCountsModel } from './affiliate-list-counts.model';

@Injectable()
export class AffiliateListCountsApi {
    constructor(private readonly rest: RestApiService) {}

    counts(): Observable<AffiliateListCountsModel> {
        return this.rest.get<ApiResponse<AffiliateListCountsModel>>('postback-counts').pipe(pluck('info', 'postbacks'));
    }
}
