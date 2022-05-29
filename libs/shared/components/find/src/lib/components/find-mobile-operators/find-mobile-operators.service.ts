import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShortResponseInterface } from '@scaleo/core/data';
import { ApiResponseWithPagination, RestApiService } from '@scaleo/core/rest-api/service';
import { GetFilterInterface } from '@scaleo/shared/services/filters';

import { BaseFindService } from '../../services/base-find.service';
import { FindMobileOperatorsModel } from './find-mobile-operators.model';

@Injectable({ providedIn: 'root' })
export class FindMobileOperatorsService extends BaseFindService<FindMobileOperatorsModel> {
    constructor(protected rest: RestApiService) {
        super(rest, 'mobile-operators-get-filter-info', 'mobile-operators');
    }

    index(filters: GetFilterInterface): Observable<ApiResponseWithPagination<ShortResponseInterface[]>> {
        return super.index(filters).pipe(
            map((response) => ({
                ...response,
                results: response.results.map((elem: FindMobileOperatorsModel) => ({
                    ...elem,
                    title: `${elem.title} ${elem.country}`
                }))
            }))
        );
    }
}
