import { Expose, Transform } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { BaseOfferModel, OfferVisibilityModel } from '@scaleo/offer/common';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { TableConversionLiveStatsModel } from '@scaleo/shared/components';
import { ShortAdvertiserModel } from '@scaleo/shared/data-access/short-entity-list';
import { Util } from '@scaleo/utils';

export class OfferListModel extends BaseOfferModel {
    @Expose()
    adv_cr?: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    private advertiser?: ShortAdvertiserModel = undefined;

    @Expose()
    aff_epc?: string = undefined;

    @Expose()
    affiliates_count?: number = undefined;

    @Expose()
    change_conversion_amount_via_postback?: number = undefined;

    @Expose()
    change_conversion_status_via_postback?: number = undefined;

    @Expose()
    cpc?: string = undefined;

    @Expose()
    cr?: string = undefined;

    @Expose()
    ar?: string = undefined;

    @Expose()
    creatives_count: number = undefined;

    @Expose()
    custom_trafficback_url?: string = undefined;

    @Expose()
    epc?: string = undefined;

    @Expose()
    links_count: number = undefined;

    @Expose()
    visible_type?: OffersVisibilityIdEnum = undefined;

    @Expose()
    visible_type_selected: OfferVisibilityModel[] = [];

    @Expose()
    live_stats: TableConversionLiveStatsModel = undefined;
}
