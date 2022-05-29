import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { AffiliateCountsModel } from './affiliate-counts.model';

@Injectable({ providedIn: 'root' })
export class AffiliateDetailCountsApi {
    constructor(private readonly rest: RestApiService) {}

    counts(id: number): Observable<AffiliateCountsModel> {
        return this.rest
            .get<ApiResponse<AffiliateCountsModel>>('affiliate-get-counts', { urlParameters: { id } })
            .pipe(pluck('info', 'affiliate'));
    }
}
