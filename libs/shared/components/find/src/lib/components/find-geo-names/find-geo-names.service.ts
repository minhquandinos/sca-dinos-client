import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShortResponseInterface } from '@scaleo/core/data';
import { ApiResponseWithPagination, RestApiService } from '@scaleo/core/rest-api/service';
import { GeoIpModel } from '@scaleo/shared/data-access';
import { GetFilterInterface } from '@scaleo/shared/services/filters';

import { BaseFindService } from '../../services/base-find.service';

@Injectable()
export class FindGeoNamesService extends BaseFindService<GeoIpModel> {
    constructor(protected rest: RestApiService, private translate: TranslateService) {
        super(rest, 'geoip-get-geonames', 'GeoNames');
    }

    index(filters: GetFilterInterface): Observable<ApiResponseWithPagination<ShortResponseInterface[]>> {
        const params: GetFilterInterface = {
            ...filters,
            lang: this.translate.currentLang
        };

        return super.index(params).pipe(
            map((response) => ({
                ...response,
                results: response.results.map((geo: any) => ({
                    ...geo,
                    id: +geo.id
                }))
            }))
        );
    }
}
