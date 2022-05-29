import { Expose } from 'class-transformer';

import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';

export enum ShortcutSearchItemEnum {
    Offer = 'offer',
    Affiliate = 'affiliate',
    Advertiser = 'advertiser'
}

export class ShortcutSearchItemModel {
    @Expose()
    id: undefined;

    @Expose()
    status: PlatformListsStatusesEnum;

    @Expose()
    email: string;
}

// export type ShortcutSearchItemType = Record<ShortcutSearchItemEnum, string>;
//
// const t: ShortcutSearchItemEnum = ShortcutSearchItemEnum.Advertiser;
