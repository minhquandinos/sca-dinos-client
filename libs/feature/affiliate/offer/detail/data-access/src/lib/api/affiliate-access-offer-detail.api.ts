import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, pluck } from 'rxjs';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { AffiliateAccessOfferViewDto, AffiliateAccessOfferViewModel } from '@scaleo/feature/affiliate/offer/detail/data-access';
import { PlatformListsService } from '@scaleo/platform/list/access-data';

import { AffiliateAccessOfferViewTransform } from '../transforms/affiliate-access-offer-view.transform';

@Injectable()
export class AffiliateAccessOfferDetailApi {
    constructor(
        private readonly rest: RestApiService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly platformListsService: PlatformListsService
    ) {}

    view(id: number): Observable<AffiliateAccessOfferViewModel> {
        return forkJoin([
            this.rest
                .get<ApiResponse<AffiliateAccessOfferViewDto>>('offer-view', {
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
                const mapper = this.jsonConvertService.mapper(AffiliateAccessOfferViewModel, response);
                return AffiliateAccessOfferViewTransform.transformModel(mapper, platformList);
            })
        );
    }

    offerRequest(offerId: number, answers?: string): Observable<void> {
        return this.rest.post('offer-request', { offer_id: offerId, additional_info: answers });
    }
}
