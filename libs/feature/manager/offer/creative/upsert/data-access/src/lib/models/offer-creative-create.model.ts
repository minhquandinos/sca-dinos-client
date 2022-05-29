import { Expose, Transform } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { BaseStatusIdEnum, CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';

export interface OfferCreativeFormControlModel {
    readonly title: string;
    readonly description: string;
    readonly type: CreativeTypesIdEnum;
    readonly offer_url_id: number;
    readonly count_impressions: BooleanEnum;
    readonly html_code: string;
    readonly plain_text: string;
    readonly xml_feed_url: string;
    readonly status: BaseStatusIdEnum;
    readonly image_data: string;
    readonly source_file: File;
    banner: string;
}

export class OfferCreativePayloadModel {
    @Expose()
    title: string = undefined;

    @Expose()
    description: string = undefined;

    @Expose()
    type: CreativeTypesIdEnum = undefined;

    @Expose()
    offer_url_id: number = undefined;

    @Expose()
    count_impressions: BooleanEnum = undefined;

    @Expose()
    html_code: string = undefined;

    @Expose()
    plain_text: string = undefined;

    @Transform(({ value }) => value.trim(), { toClassOnly: true })
    @Expose()
    xml_feed_url: string = undefined;

    @Expose()
    status: BaseStatusIdEnum = undefined;

    @Expose()
    image_data: string = undefined;

    source_file?: File = undefined;
}

export interface OfferCreativeCreateInputDataModel {
    id?: number;
    offerId: number;
}
