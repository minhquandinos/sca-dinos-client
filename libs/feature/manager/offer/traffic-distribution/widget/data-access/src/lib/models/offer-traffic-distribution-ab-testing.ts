import { Expose, Transform } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';

interface LandingModel {
    id: number;
    is_default: BooleanEnum;
}

export interface OfferTrafficDistributionABTestingDto {
    id: number;
    landing: LandingModel;
    distribution: string;
    added_date: string;
    clicks: number;
    conversions: number;
    cr: number;
}

export class OfferTrafficDistributionABTestingModel {
    @Expose()
    id: number | string;

    @Expose()
    landing: LandingModel;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    distribution: number;

    @Expose()
    added_date: string;

    @Expose()
    clicks: number;

    @Expose()
    conversions: number;

    @Expose()
    cr: number;
}

export interface OfferTrafficDistributionAbTestingCreatePayloadDto {
    link_id: number;
    distribution: number;
}

export type OfferTrafficDistributionAbTestingUpdatePayloadDto = Pick<OfferTrafficDistributionAbTestingCreatePayloadDto, 'distribution'>;

export interface OfferTrafficDistributionAbTestingQueryParamsDto {
    rangeFrom: string;
    rangeTo: string;
}
