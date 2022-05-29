import { Any, JsonProperty } from 'json2typescript';

import { OfferUrlsInterface } from '@scaleo/offer/common';
import { CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';

interface TypeSelectedModel {
    id: number;
    title: string;
}

export class CreativeModel {
    @JsonProperty('id', Number)
    id: number = undefined;

    @JsonProperty('title', String)
    title: string = undefined;

    @JsonProperty('description', String)
    description: string = undefined;

    @JsonProperty('type', Number)
    type: CreativeTypesIdEnum = undefined;

    @JsonProperty('offer_url_id', Number)
    offer_url_id: number = undefined;

    @JsonProperty('count_impressions', Number)
    count_impressions: number = undefined;

    @JsonProperty('html_code', Any)
    html_code: any = undefined;

    @JsonProperty('plain_text', Any)
    plain_text: any = undefined;

    @JsonProperty('status', Number)
    status: number = undefined;

    @JsonProperty('offer_id', Number)
    offer_id: number = undefined;

    @JsonProperty('type_selected', String)
    private _type_selected: string = undefined;

    get type_selected(): TypeSelectedModel[] {
        return JSON.parse(this._type_selected);
    }

    get type_selected_title(): string {
        return this.type_selected[0]?.title.toLowerCase().replace(/ /g, '_') || '';
    }

    @JsonProperty('offer_url_selected', String, true)
    private _offer_url_selected?: string = undefined;

    get offer_url_selected(): OfferUrlsInterface[] {
        return JSON.parse(this._offer_url_selected) || [];
    }

    @JsonProperty('tracking_url', String, true)
    tracking_url?: string = undefined;

    @JsonProperty('image', String, true)
    image?: string = undefined;

    @JsonProperty('image_data', Any, true)
    image_data?: any = undefined;

    @JsonProperty('source_file', File, true)
    source_file?: File = undefined;

    @JsonProperty('banner', Any, true)
    banner?: any = undefined;

    @JsonProperty('image_height', Number, true)
    image_height?: number = undefined;

    @JsonProperty('image_size', Number, true)
    image_size?: number = undefined;

    @JsonProperty('image_width', Number, true)
    image_width?: number = undefined;

    @JsonProperty('xml_feed_url', String, true)
    xml_feed_url?: string = undefined;

    @JsonProperty('added_date', String, true)
    added_date?: string = undefined;
}
