import { Expose, Transform } from 'class-transformer';

import { SignUpInfoModel } from '@scaleo/auth/data';
import { BaseObjectModel, BooleanEnum } from '@scaleo/core/data';
import { BaseStatusIdEnum } from '@scaleo/platform/list/access-data';
import { ContactModel } from '@scaleo/shared/components/contact';
import { CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { ShortGeoNameDto, ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { Util } from '@scaleo/utils';

export class AffiliateDetailWidgetModel {
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
    status: BaseStatusIdEnum;

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
    get fullAddress(): string {
        const address = [this.address, this.city, this.region, this.country_selected?.title, this.postal_code];
        return address.filter((el) => el).join(', ');
    }

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
    @Transform(({ value }) => Util.jsonParse(value, []) || [], { toClassOnly: true })
    managers_assigned: ShortManagerModel[] = [];

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []) || [], { toClassOnly: true })
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
    @Transform(({ value }) => Util.jsonParse(value, []) || [], { toClassOnly: true })
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

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, {}) || {}, { toClassOnly: true })
    referral_sponsor_info?: AffiliateDetailWidgetReferralSponsorInfoModel;

    @Expose()
    referred_by: number;

    @Expose()
    referral_balance: number | string;

    @Expose()
    referral_commission: number | string;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []) || [], { toClassOnly: true })
    referrals_info: AffiliateDetailWidgetReferralInfoModel[];

    @Expose()
    available_sponsor?: boolean;
}

interface AffiliateDetailWidgetReferralSponsorInfoModel {
    referral_sponsor_id: number;
    referral_sponsor_name: string;
    referral_sponsor_firstname: string;
    referral_sponsor_lastname: string;
}

interface AffiliateDetailWidgetReferralInfoModel {
    affiliate: string;
    referred_affiliate: string;
    rate: number;
    base_amount: number;
    referral_commission: number;
    status: number;
    created: number;
}
