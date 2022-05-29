import { Expose } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';

export type SmartLinkStatusesType = PlatformListsStatusesEnum.Active | PlatformListsStatusesEnum.Inactive;

export enum SmartLinkStatusesEnum {
    Active = PlatformListsStatusesEnum.Active,
    Inactive = PlatformListsStatusesEnum.Active
}

export class AbstractSmartLinkModel {
    @Expose()
    id: number = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    status: SmartLinkStatusesType = undefined;

    @Expose()
    image: string = undefined;

    @Expose()
    available_for_affiliates?: BooleanEnum = undefined;

    @Expose()
    description?: string = undefined;
}
