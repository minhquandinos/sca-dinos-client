import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseIdTitleModel } from '@scaleo/core/data';
import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { rxjsOperatorsUtil, Util } from '@scaleo/utils';

import { ShortEntityListInterface } from '../interfaces/short-entity-list.interface';
import { ShortAffiliateModel } from '../models';

export class FirstActiveAffiliate implements ShortEntityListInterface<ShortAffiliateModel[]> {
    constructor(private rest: RestApiService) {}

    list(): Observable<ShortAffiliateModel[]> {
        return this.rest.get<ApiResponse<BaseIdTitleModel>>('get-first-active-affiliate').pipe(
            map(({ info: { affiliate } }) => (Util.isNotEmpty(affiliate) ? [affiliate] : [])),
            rxjsOperatorsUtil.emptyResponseOnCatchError([])
        );
    }
}
