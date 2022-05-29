import { Expose, Transform } from 'class-transformer';
import { Observable } from 'rxjs';

import { AnnouncementsListDto, VisibleRoleType } from '@scaleo/feature/manager/outbound/announcements/list/data-access';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { Util } from '@scaleo/utils';

export type AnnouncementUpsertViewDto = Omit<AnnouncementsListDto, 'sending_timestamp' | 'sending_users'>;

export class AnnouncementUpsertViewModel {
    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    author: ShortManagerModel;

    @Expose()
    author_id: number;

    @Expose()
    author_role: number;

    @Expose()
    @Transform(({ value }) => (value ? value?.split(',').map((i: string) => +i) : []), { toClassOnly: true })
    connected_offers: number[];

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
    status: PlatformListsStatusesEnum;

    @Expose()
    title: string;

    @Expose()
    updated: number;

    @Expose()
    visible_for: AnnouncementVisibleRoleEnum;

    @Expose()
    image_data = '';
}

export interface AnnouncementUpsertPayloadDto {
    connected_offers: string;
    content: string;
    emails_sent_flag: number;
    image: string;
    pin_to_top: number;
    send_notification_to_users: number;
    status: number;
    title: string;
    visible_for: AnnouncementVisibleRoleEnum;
}

export interface AnnouncementUpsertItemsVisibleRolesModel {
    id: VisibleRoleType;
    title: Observable<string>;
}

export interface AnnouncementTestEmailModel {
    email: string;
    subject: string;
    body: string;
}

export enum AnnouncementVisibleRoleEnum {
    Affiliate = 'affiliate',
    Advertiser = 'advertiser'
}
