import { Validators } from '@angular/forms';
import { Expose, Transform } from 'class-transformer';

import { SignUpInfoModel } from '@scaleo/auth/data';
import { BaseObjectModel, BooleanEnum } from '@scaleo/core/data';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { ReferralsInfoInterface } from '@scaleo/platform/referral/common';
import { ContactModel } from '@scaleo/shared/components/contact';
import { CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { ShortGeoNameDto, ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { CustomValidators } from '@scaleo/shared/validators';
import { ArrayUtil, Util } from '@scaleo/utils';

export class AffiliateUpsertModel {
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
    internal_notes: string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    registration: SignUpInfoModel = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []).map((elem: ShortManagerModel) => +elem?.id) || [], { toClassOnly: true })
    managers_assigned: number[] = [];

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []).map((elem: BaseObjectModel) => elem?.id) || [], { toClassOnly: true })
    traffic_types_selected: number[];

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    country_selected?: ShortGeoNameDto;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    visited_info?: BaseObjectModel;

    @Expose()
    account_type: number;

    @Expose()
    image_data: string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []).map((elem: BaseObjectModel) => elem?.id) || [], { toClassOnly: true })
    tags_selected: number[] = [];

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

export class AffiliateUpsertFormControlModel {
    company_name: string;
    image_data: string;
    status: PlatformListsStatusesEnum;
    email: string;
    password: string;
    password_repeat: string;
    firstname: string;
    lastname: string;
    phone: string;
    contacts: ContactModel[];
    address: string;
    city: string;
    region: string;
    country: string;
    postal_code: string;
    traffic_types: number[];
    tags: string[];
    internal_notes: string;
    managers: number[];
    custom_fields: CustomFieldInterface[];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;
}

export class AffiliateUpsertPayloadDto {
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
    @Transform(({ value }) => (value !== null ? value : ''), { toClassOnly: true })
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
    account_type: number;

    @Expose()
    @Transform(({ value }) => ArrayUtil.join(value) || '', { toClassOnly: true })
    tags?: string;

    @Expose()
    @Transform(({ value }) => (value !== null ? value : ''), { toClassOnly: true })
    internal_notes: string;

    @Expose()
    @Transform(({ value }) => ArrayUtil.join(value) || '', { toClassOnly: true })
    managers?: string;

    @Expose()
    @Transform(({ value }) => ArrayUtil.join(value) || '', { toClassOnly: true })
    traffic_types?: string;

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
