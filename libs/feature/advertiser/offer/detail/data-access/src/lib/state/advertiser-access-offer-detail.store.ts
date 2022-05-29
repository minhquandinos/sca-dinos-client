import { Injectable } from '@angular/core';
import { guid, StoreConfig } from '@datorama/akita';

import { BooleanEnum } from '@scaleo/core/data';
import { BaseStateStore, createBaseInitialState } from '@scaleo/core/state/state';

import { AdvertiserAccessOfferViewModel } from '../models/advertiser-access-offer-view.model';

export type AdvertiserAccessOfferViewState = AdvertiserAccessOfferViewModel;

const createInitialState = createBaseInitialState<AdvertiserAccessOfferViewState>({
    aff_epc: undefined,
    ar: undefined,
    cr: undefined,
    ask_approval_questions: undefined,
    creatives: [],
    creatives_count: 0,
    currency: undefined,
    deep_linking: 0,
    description: undefined,
    epc: undefined,
    goals: [],
    gt_excluded_ids: undefined,
    gt_included_ids: undefined,
    id: undefined,
    image: undefined,
    is_featured: BooleanEnum.False,
    links: [],
    links_count: 0,
    postbacks: [],
    questions: undefined,
    tags_selected: [],
    targeting: undefined,
    timezone: undefined,
    title: undefined,
    tracking_domain: undefined,
    traffic_types_selected: undefined,
    visible_type_selected: [],
    currency_name: '',
    extended_targeting: [],
    internal_info: '',
    status: undefined,
    expiration_date: undefined,
    is_expires: BooleanEnum.False
});

@Injectable()
@StoreConfig({ name: `advertiser-access-offer-detail-${guid()}`, resettable: true })
export class AdvertiserAccessOfferDetailStore extends BaseStateStore<any> {
    constructor() {
        super(createInitialState);
    }
}
