import { Expose } from 'class-transformer';

import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';
import { OfferUrlsInterface } from '@scaleo/offer/common';
import { BaseStatusIdEnum, CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';

export class OfferCreativeModel {
    @Expose()
    id: number = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    description: string = undefined;

    @Expose()
    type: BaseIdTitleModel | any = undefined;

    @Expose()
    image: string = undefined;

    @Expose()
    image_width: number = undefined;

    @Expose()
    image_height: number = undefined;

    @Expose()
    image_size: number = undefined;

    @Expose()
    offer_url: OfferUrlsInterface = undefined;

    @Expose()
    count_impressions: BooleanEnum = undefined;

    @Expose()
    html_code: string = undefined;

    @Expose()
    plain_text: string = undefined;

    @Expose()
    xml_feed_url: string = undefined;

    @Expose()
    status: BaseStatusIdEnum = undefined;

    @Expose({ toPlainOnly: true })
    get isXmlFeed(): boolean {
        return this.type.id === CreativeTypesIdEnum.XMLFeed;
    }

    @Expose()
    added_date: string = undefined;

    @Expose()
    tracking_domain: string = undefined;
}

export interface OfferCreativeDto {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly type: BaseIdTitleModel;
    readonly image: string;
    readonly image_width: number;
    readonly image_height: number;
    readonly image_size: number;
    readonly offer_url: OfferUrlsInterface;
    readonly count_impressions: number;
    readonly html_code: string;
    readonly plain_text: string;
    readonly xml_feed_url: string;
    readonly status: BaseStatusIdEnum;
    readonly added_date: string;
}
