import { Expose, Transform } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';

import { SecurityControlEnum } from '../enums/security-control.enum';

export interface SecurityDto {
    [SecurityControlEnum.Manager]: BooleanEnum;
    [SecurityControlEnum.Affiliate]: BooleanEnum;
    [SecurityControlEnum.Advertiser]: BooleanEnum;
    [SecurityControlEnum.AdvertiserPostbackToken]: BooleanEnum;
}

export class SecurityModel {
    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    [SecurityControlEnum.Manager]: BooleanEnum;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    [SecurityControlEnum.Affiliate]: BooleanEnum;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    [SecurityControlEnum.Advertiser]: BooleanEnum;

    @Expose()
    @Transform(({ value }) => +value, { toClassOnly: true })
    [SecurityControlEnum.AdvertiserPostbackToken]: BooleanEnum;
}
