import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, pluck } from 'rxjs';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PlatformListsService } from '@scaleo/platform/list/access-data';

import { AdvertiserAccessOfferViewDto, AdvertiserAccessOfferViewModel } from '../models/advertiser-access-offer-view.model';
import { AdvertiserAccessOfferViewTransform } from '../transforms/advertiser-access-offer-view.transform';

@Injectable()
export class AdvertiserAccessOfferDetailApi {
    constructor(
        private readonly rest: RestApiService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly platformListsService: PlatformListsService
    ) {}

    view(id: number): Observable<AdvertiserAccessOfferViewModel> {
        return forkJoin([
            this.rest
                .get<ApiResponse<AdvertiserAccessOfferViewDto>>('offer-view', {
                    urlParameters: {
                        id
                    }
                })
                .pipe(pluck('info', 'offer')),
            this.platformListsService.platformListsNew(
                'offers_targeting_rules,goals_caps_periods,timezones,currencies,goal_tracking_methods,offer_urls_types,conversion_statuses,postback_levels,postback_tracking_methods'
            )
        ]).pipe(
            map(([response, platformList]) => {
                const mapper = this.jsonConvertService.mapper(AdvertiserAccessOfferViewModel, response);
                return AdvertiserAccessOfferViewTransform.transformModel(mapper, platformList);
            })
        );
    }
}
