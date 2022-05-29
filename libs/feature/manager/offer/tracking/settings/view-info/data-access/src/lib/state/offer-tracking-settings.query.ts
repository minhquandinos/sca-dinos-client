import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { OfferTrackingSettingsUtil } from '@scaleo/feature/manager/offer/tracking/common';
import { ArrayUtil } from '@scaleo/utils';

import { InvalidTrafficForwardingViewModel, OfferTrackingSettingsModel } from '../models/offer-tracking-settings.model';
import { OfferTrackingSettingsState, OfferTrackingSettingsStore } from './offer-tracking-settings.store';

type PostbackTokenType = Pick<OfferTrackingSettingsModel, 'require_postback_token' | 'postback_token'>;

@Injectable()
export class OfferTrackingSettingsQuery extends Query<OfferTrackingSettingsState> {
    constructor(protected readonly store: OfferTrackingSettingsStore) {
        super(store);
    }

    get data(): OfferTrackingSettingsModel {
        return this.getValue().data;
    }

    get data$(): Observable<OfferTrackingSettingsModel> {
        return this.select('data').pipe(filter((data) => !!data));
    }

    get trackingDomain$(): Observable<string> {
        return this.data$.pipe(
            map(({ tracking_domains, tracking_domain_id }) => ArrayUtil.findByKey(tracking_domains, 'id', tracking_domain_id).name)
        );
    }

    get globalPostbackLink$(): Observable<string> {
        return combineLatest([this.trackingDomain$, this.getPostbackToken$]).pipe(
            map(([domain, postbackToken]: [string, PostbackTokenType]) =>
                OfferTrackingSettingsUtil.postback(domain, postbackToken.postback_token)
            )
        );
    }

    get invalidTrafficForwardingViewData$(): Observable<InvalidTrafficForwardingViewModel> {
        return this.data$.pipe(
            map(({ fail_traffic_forwarding, custom_trafficback_url, offers_to_forward_obj }) => ({
                fail_traffic_forwarding,
                custom_trafficback_url,
                offers_to_forward_obj
            }))
        );
    }

    private get getPostbackToken$(): Observable<PostbackTokenType> {
        return this.data$.pipe(
            map(({ require_postback_token, postback_token }) => ({
                require_postback_token,
                postback_token
            }))
        );
    }
}
