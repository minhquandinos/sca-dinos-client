import { Expose, Transform } from 'class-transformer';
import { Observable } from 'rxjs';

import { PageRequestModel, SearchRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { ShortAdvertiserModel, ShortAffiliateModel, ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { Util } from '@scaleo/utils';

export type AnnouncementsListQueryParamsModel = PageRequestModel & StatusRequestModel & SortRequestModel & SearchRequestModel;

export interface AnnouncementsListDto {
    author: string;
    author_id: number;
    author_role: number;
    connected_offers: string;
    connected_offers_selected: string;
    content: string;
    created: number;
    emails_sent: number;
    emails_sent_flag: number;
    id: number;
    image: string;
    pin_to_top: number;
    send_notification_to_users: number;
    sending_timestamp: number;
    sending_users: string;
    status: number;
    title: string;
    updated: number;
    visible_for: string;
}

export interface AnnouncementsListSendingUsersModel {
    affiliates?: ShortAffiliateModel[];
    advertisers?: ShortAdvertiserModel[];
}

export class AnnouncementsListModel {
    @Expose()
    @Transform(
        ({ value }) => {
            const author = Util.jsonParse(value, {});
            return author ? [author] : [];
        },
        { toClassOnly: true }
    )
    author: ShortManagerModel[] = [];

    @Expose()
    author_id: number;

    @Expose()
    author_role: number;

    @Expose()
    connected_offers: string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    connected_offers_selected: string[];

    @Expose()
    content: string;

    @Expose()
    created: number;

    @Expose()
    emails_sent: number;

    @Expose()
    emails_sent_flag: number;

    @Expose()
    id: number;

    @Expose()
    image: string;

    @Expose()
    pin_to_top: number;

    @Expose()
    send_notification_to_users: number;

    @Expose()
    sending_timestamp: number;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}), { toClassOnly: true })
    sending_users: AnnouncementsListSendingUsersModel;

    @Expose()
    status: PlatformListsStatusesEnum;

    @Expose()
    title: string;

    @Expose()
    updated: number;

    @Expose()
    @Transform(({ value }) => (value || '')?.split(','), { toClassOnly: true })
    visible_for: string[];
}

export interface AnnouncementsListInterface {
    id: number;
    title: string;
    status: number;
    image: string;
    image_data?: string;
    content: string;
    visible_for: string;
    visible_for_as_array?: string[];
    pin_to_top: number;
    connected_offers: string;
    send_notification_to_users: number;
    emails_sent: number;
    author_id: number;
    author_role: string;
    created: number;
    updated: number;
    author: string;
    author_as_array?: ShortManagerModel[];
    connected_offers_selected: any;
    sending_users: string;
    sending_users_as_object: {
        affiliates?: ShortAffiliateModel[];
        advertisers?: ShortAdvertiserModel[];
    };
    sending_timestamp: number;
    first_connected_offer_selected?: string;
    count_connected_offers_selected?: number;
}

// export interface TestEmailModel {
//     email: string;
//     subject: string;
//     body: string;
// }

export type VisibleRoleType = 'affiliate' | 'advertiser';

export interface ItemsVisibleRoles {
    id: VisibleRoleType;
    title: Observable<string>;
}

export enum OnOffEnum {
    On = 1,
    Off = 0
}

// export enum AnnouncementsStatusesEnum {
//     Status = 0,
//     Active = 1,
//     Draft = 2,
//     Inactive = 3
// }

// eslint-disable-next-line @typescript-eslint/naming-convention
// export const AnnouncementsStatuses: PlatformListsFormatInterface[] = [
//     { title: 'active', id: 1 },
//     { title: 'draft', id: 2 },
//     { title: 'inactive', id: 3 }
// ];
