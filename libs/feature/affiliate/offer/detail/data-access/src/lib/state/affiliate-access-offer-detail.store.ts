import { Injectable } from '@angular/core';
import { guid, StoreConfig } from '@datorama/akita';

import { BooleanEnum } from '@scaleo/core/data';
import { BaseStateStore, createBaseInitialState } from '@scaleo/core/state/state';
import { AffiliateAccessOfferViewModel } from '@scaleo/feature/affiliate/offer/detail/data-access';

export type AffiliateAccessOfferViewState = AffiliateAccessOfferViewModel;

const createInitialState = createBaseInitialState<AffiliateAccessOfferViewState>({
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
    extended_targeting: []
});

@Injectable()
@StoreConfig({ name: `affiliate-access-offer-detail-${guid()}`, resettable: true })
export class AffiliateAccessOfferDetailStore extends BaseStateStore<any> {
    constructor() {
        super(createInitialState);
    }
}
