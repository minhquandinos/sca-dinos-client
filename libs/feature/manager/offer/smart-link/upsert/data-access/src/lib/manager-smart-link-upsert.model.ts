import { Expose, Transform } from 'class-transformer';

import { BaseIdTitleModel } from '@scaleo/core/data';
import { AbstractSmartLinkModel } from '@scaleo/offer/smart-link/common';

export class SmartLinkViewModel extends AbstractSmartLinkModel {
    @Expose()
    @Transform(({ value }) => (value === 0 ? undefined : value), { toClassOnly: true })
    traffic_distribution: number = undefined;

    @Expose()
    @Transform(
        ({ value }) => {
            return (value || [])?.filter((elem: BaseIdTitleModel) => elem?.id)?.map((elem: BaseIdTitleModel) => elem.id);
        },
        {
            toClassOnly: true
        }
    )
    offers_with_tags_selected: string[] = undefined;

    // @Expose()
    // @Transform(({ value }) => (value || '')?.split(',')?.filter((id: any) => id), { toClassOnly: true })
    // offers_with_tags: string[] = undefined;

    @Expose()
    other_offers: number[] = [];

    @Expose()
    domain_for_tracking_link: number = undefined;

    @Expose()
    allowed_traffic_types: string[] = [];

    @Expose()
    image_data?: string = undefined;
}

export class SmartLinkUpsertModel extends AbstractSmartLinkModel {
    @Expose()
    image_data: string = undefined;

    @Expose()
    other_offers: number[] = [];

    @Expose()
    offers_with_tags: string = undefined;

    @Expose()
    allowed_traffic_types: string = undefined;

    @Expose()
    domain_for_tracking_link: number = undefined;

    @Expose()
    traffic_distribution: number = undefined;
}

export interface SmartLinkFormControlModel extends Omit<SmartLinkUpsertModel, 'offers_with_tags' | 'allowed_traffic_types'> {
    offers_with_tags: number[];
    allowed_traffic_types: number[];
}
