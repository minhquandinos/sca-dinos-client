import { Any, JsonObject, JsonProperty } from 'json2typescript';

import {
    GoalInterface,
    OfferCreativeInterface,
    OfferUrlsInterface,
    OfferVisibilityModel,
    TrackingDomainsInterface
} from '@scaleo/offer/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

export interface OfferPromoteWidgetResponseModel {
    counts: OfferPromoteWidgetCategoriesModel[];
    offers: OfferPromoteWidgetItemsModel[];
}

@JsonObject('OfferPromoteWidgetItemsModel')
export class OfferPromoteWidgetItemsModel {
    @JsonProperty('id', Number)
    id: number = undefined;

    @JsonProperty('title', String)
    title: string = undefined;

    @JsonProperty('image', String)
    image: string = undefined;

    @JsonProperty('is_featured', Number)
    _is_featured: number = undefined;

    get isFeatured(): boolean {
        return this._is_featured === 1;
    }

    @JsonProperty('goals')
    goals: GoalInterface[] = [];

    @JsonProperty('currency', String)
    currency: CurrencyEnum = undefined;

    @JsonProperty('visible_type', Any, true)
    visible_type: OffersVisibilityIdEnum = undefined;

    @JsonProperty('visible_type_selected', Any, true)
    visible_type_selected: OfferVisibilityModel[] = [];

    // @JsonProperty('visible_type')
    // private _visible_type: string = undefined;

    // get visible_type(): OfferVisibilityInterface[] {
    //     const parse: OfferVisibilityInterface[] = JSON.parse(this._visible_type);
    //     return parse.length > 0 ? parse : undefined;
    // }

    get firstVisibility(): OfferVisibilityModel {
        return (this.visible_type_selected as OfferVisibilityModel[])[0];
    }

    @JsonProperty('links')
    links: OfferUrlsInterface[] = [];

    @JsonProperty('creatives')
    creatives: OfferCreativeInterface[] = [];

    @JsonProperty('tracking_domain')
    private _tracking_domain: string = undefined;

    get trackingDomain(): TrackingDomainsInterface {
        return JSON.parse(this._tracking_domain);
    }

    @JsonProperty('deep_linking')
    private _deep_linking: number = undefined;

    get hasDeepLinking(): boolean {
        return this._deep_linking === 1;
    }
}

export class OfferPromoteWidgetCategoriesModel {
    category_id: number;

    category_title: string;

    count: number;
}
