import { Expose, Transform } from 'class-transformer';

import { ProfileApiStatusType } from '@scaleo/account/common';
import { BooleanEnum } from '@scaleo/core/data';
import { DateFormatEnum, NumberFormatEnum } from '@scaleo/platform/format/models';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { ContactModel } from '@scaleo/shared/components/contact';
import { Util } from '@scaleo/utils';

export interface TeammateUpsertViewDto {
    access_token: string;
    api_key: string;
    api_status: ProfileApiStatusType;
    auth_key: string;
    contacts: string;
    created: number;
    dashboard_config_custom: string;
    dashboard_config_default: string;
    date_format_id: DateFormatEnum;
    email: string;
    email_mailroom: BooleanEnum;
    email_notifications: BooleanEnum;
    expiration_time: number;
    firstname: string;
    id: number;
    image: string;
    ip: string;
    lastname: string;
    number_format_id: NumberFormatEnum;
    password_hash: string;
    phone: string;
    role: string;
    show_email_for_users: BooleanEnum;
    show_network_revenue: BooleanEnum;
    status: PlatformListsStatusesEnum;
    timezone: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;
    updated: number;
    users_count: number;
    visited: number;
}

export class TeammateUpsertViewModel {
    @Expose()
    access_token: string;

    @Expose()
    api_key: string;

    @Expose()
    api_status: ProfileApiStatusType;

    @Expose()
    auth_key: string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    contacts: ContactModel[] = [];

    @Expose()
    @Transform(({ value }) => value, { toClassOnly: true })
    role: DefaultRoleEnum = undefined;

    @Expose()
    created: number;

    @Expose()
    date_format_id: DateFormatEnum;

    @Expose()
    email: string;

    @Expose()
    email_mailroom: BooleanEnum;

    @Expose()
    email_notifications: BooleanEnum;

    @Expose()
    expiration_time: number;

    @Expose()
    firstname: number;

    @Expose()
    id: number;

    @Expose()
    image: string;

    @Expose()
    ip: string;

    @Expose()
    lastname: string;

    @Expose()
    number_format_id: NumberFormatEnum;

    @Expose()
    phone: string;

    @Expose()
    show_email_for_users: BooleanEnum;

    @Expose()
    show_network_revenue: BooleanEnum;

    @Expose()
    status: PlatformListsStatusesEnum;

    @Expose()
    timezone: string;

    @Expose()
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;

    @Expose()
    updated: number;

    @Expose()
    users_count: number;

    @Expose()
    visited: number;
}

export interface TeammateUpsertPayloadDto {
    active_managers: string;
    api_status: ProfileApiStatusType;
    contacts: string;
    date_format_id: DateFormatEnum;
    email: string;
    firstname: string;
    image_data: string;
    lastname: string;
    number_format_id: NumberFormatEnum;
    phone: string;
    role: string;
    show_email_for_users: BooleanEnum;
    status: PlatformListsStatusesEnum;
    timezone: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;
}

export interface TeammateUpsertFormControlModel {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    password_repeat: string;
    contacts: ContactModel[];
    phone: string;
    status: PlatformListsStatusesEnum;
    role: DefaultRoleEnum;
    api_status: ProfileApiStatusType;
    active_managers: any;
    number_format_id: NumberFormatEnum;
    date_format_id: NumberFormatEnum;
    timezone: string;
    show_email_for_users: BooleanEnum;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;
}
