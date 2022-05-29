import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';

// import { GoalShortInterface, GoalViewModel } from '../../../../../../../../apps/scaleo/src/app/core/models/goal.interface';

interface GoalShortInterface {
    id: number;
    title: string;
    type: number;
}

@Injectable({ providedIn: 'root' })
export class GoalsService {
    constructor(private rest: RestApiService) {}
    public index(offerId: number, filters?: BaseObjectModel): Observable<ApiResponseWithPagination<GoalShortInterface[]>> {
        const params = RequestUtil.queryParams(filters);

        const options: RestApiOptions = {
            urlParameters: { offerId },
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest
            .get<ApiResponse<GoalShortInterface[]>>('offers-goals-get-filter-info', options)
            .pipe(map((response) => ResponseUtil.pagination<BaseObjectModel[]>(response.headers, response.body.info.goals)));
    }
}
