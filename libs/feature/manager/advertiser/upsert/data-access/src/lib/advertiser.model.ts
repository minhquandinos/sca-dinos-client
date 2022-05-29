import { Validators } from '@angular/forms';
import { Expose, Transform } from 'class-transformer';

import { SignUpInfoModel, TwoFAModel } from '@scaleo/auth/data';
import { BaseObjectModel, BooleanEnum } from '@scaleo/core/data';
import { DateFormatEnum } from '@scaleo/platform/format/models';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { ContactModel } from '@scaleo/shared/components/contact';
import { CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { ShortGeoNameDto, ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { CustomValidators } from '@scaleo/shared/validators';
import { ArrayUtil, Util } from '@scaleo/utils';

export interface AdvertiserDto extends TwoFAModel {
    access_token: string;
    account_balance: string;
    activity: number;
    address: string;
    api_key: string;
    api_status: BooleanEnum;
    auth_key: string;
    city: string;
    company_name: string;
    contacts: string;
    conversions: number;
    country: number;
    country_selected: string;
    created: number;
    custom_fields: string;
    date_format_id: DateFormatEnum;
    email: string;
    email_mailroom: BooleanEnum;
    email_notifications: BooleanEnum;
    expiration_time: number;
    external_id: string;
    firstname: string;
    id: number;
    image: string;
    ip: string;
    lastname: string;
    managers_assigned: string;
    notes: string;
    number_format_id: number;
    offers_count: number;
    payment_details: string;
    phone: string;
    postal_code: string;
    postback_token: string;
    region: string;
    registration: string;
    require_postback_token: number;
    status: 1;
    tags: string;
    tags_selected: string;
    timezone: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;
    updated: number;
    visited: number;
    website_url: string;
}

export class AdvertiserModel {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    password: string;

    @Expose()
    password_repeat: string;

    @Expose()
    firstname: string;

    @Expose()
    lastname: string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    contacts: ContactModel[] = [];

    @Expose()
    account_balance: string;

    @Expose()
    company_name: string;

    @Expose()
    website_url: string;

    @Expose()
    phone: string;

    @Expose()
    image: string;

    @Expose()
    notes: string;

    @Expose()
    status: number;

    @Expose()
    api_status: number;

    @Expose()
    country: number;

    @Expose()
    region: string;

    @Expose()
    city: string;

    @Expose()
    address: string;

    @Expose()
    postal_code: string;

    @Expose()
    ip: string;

    @Expose()
    timezone: string;

    @Expose()
    created: number | string;

    @Expose()
    updated: number | string;

    @Expose()
    visited: number | string;

    @Expose()
    activity: number | string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    registration: SignUpInfoModel = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []) || [], { toClassOnly: true })
    managers_assigned: ShortManagerModel[] = [];

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    country_selected?: ShortGeoNameDto;

    @Expose()
    tags: string;

    @Expose()
    image_data: string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []) || [], { toClassOnly: true })
    tags_selected: BaseObjectModel[] = [];

    @Expose()
    auth_key: string;

    @Expose()
    api_key: string;

    @Expose()
    payment_details: string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []) || [], { toClassOnly: true })
    custom_fields: CustomFieldInterface[];

    @Expose()
    offers_count: number;

    @Expose()
    security_token: string;

    @Expose()
    require_postback_token: BooleanEnum;

    @Expose()
    postback_token: string;

    @Expose()
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;
}

export class AdvertiserPayloadDto {
    @Expose()
    company_name: string;

    @Expose()
    image_data?: string;

    @Expose()
    status: number;

    @Expose()
    email: string;

    @Expose()
    password?: string;

    @Expose()
    password_repeat?: string;

    @Expose()
    firstname: string;

    @Expose()
    lastname: string;

    @Expose()
    phone: string;

    @Expose()
    contacts: string;

    @Expose()
    @Transform(({ value }) => (value !== null ? value : 0), { toClassOnly: true })
    country: number;

    @Expose()
    region: string;

    @Expose()
    city: string;

    @Expose()
    address: string;

    @Expose()
    postal_code: string;

    @Expose()
    payment_details?: string;

    @Expose()
    @Transform(({ value }) => ArrayUtil.join(value) || '', { toClassOnly: true })
    tags?: string;

    @Expose()
    notes: string;

    @Expose()
    @Transform(({ value }) => ArrayUtil.join(value) || '', { toClassOnly: true })
    managers?: string;

    @Expose()
    custom_fields: string;

    @Expose()
    api_status: number;

    @Expose()
    require_postback_token: BooleanEnum;

    @Expose()
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;
}

export interface AdvertiserFormControlModel {
    company_name: string;
    image_data: string;
    status: PlatformListsStatusesEnum;
    email: string;
    password: string;
    password_repeat: string;
    firstname: string;
    lastname: string;
    phone: string;
    contacts: any;
    address: string;
    city: string;
    region: string;
    country: number;
    postal_code: string;
    payment_details: string;
    traffic_types: number[];
    tags: number[];
    notes: string;
    managers: number[];
    custom_fields: any;
    api_status: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;
}
