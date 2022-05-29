import { JsonObject, JsonProperty } from 'json2typescript';

import { TwoFAModel } from '@scaleo/auth/data';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { ReferralsInfoInterface } from '@scaleo/platform/referral/common';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { StatisticRowGeoModel } from '@scaleo/reports/common';
import { CustomFieldViewModel } from '@scaleo/shared/components';
import { GeoIpModel } from '@scaleo/shared/data-access';

export interface AffiliateInterface extends TwoFAModel {
    // extends AffiliateDetailSettingsModel
    id?: number;
    account_type?: number;
    company_name?: string;
    image?: any;
    imageBlob?: any;
    status?: number;
    email?: string;
    password?: string;
    password_repeat?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    address?: string;
    city?: number;
    company?: string;
    region?: number;
    country?: number;
    postal_code?: string;
    payment_details?: string;
    traffic_types?: string;
    tags?: string;
    // referral_sponsor?: number;
    // referral_share?: number;
    notes?: string;
    media_types?: number;
    timezone?: string;
    auth_key?: string;
    created?: number | string;
    contacts?: any;
    image_data?: string;
    ip?: string;
    registration?: any;
    internal_notes?: string;
    managers_assigned?: Array<{ [key: string]: string }>;
    managers?: string;
    account_balance?: number;
    country_selected?: GeoIpModel;
    tags_selected?: any;
    traffic_types_selected?: Array<{ [key: string]: string }>;
    activity?: number | string;
    visited?: number | string;
    referral_sponsor_info?: AffiliateReferralSponsorInfo;
    custom_fields: CustomFieldViewModel | string | any;
    domains_count?: number;
    postbacks_count?: number;
    sources_count?: number;
    api_key?: string;
    referrals_info: ReferralsInfoInterface[];
    countryInfo: StatisticRowGeoModel;
    visited_info?: StatisticRowGeoModel;
    available_sponsor?: boolean;
}

export interface AffiliateDataRegistrationInterface {
    created: string;
    ip: string;
    country_code: string;
    country: string;
    region: string;
    city: string;
}

export interface SponsorsParamsInterface {
    search?: any;
    except?: number;
    perPage?: number;
    page: number;
}

export interface SponsorsInterface {
    id: number;
    firstname: string;
    lastname: string;
    company: string;
}

export interface AffiliateSourceInterface {
    id: number;
    title: string;
    traffic_types: string;
    status: number;
    affiliate_id: number;
    created?: number;
    updated?: number;
    traffic_types_selected?: { [key: string]: string }[];
}

export interface AffiliateCountsInterface {
    domains: number;
    postbacks: number;
    sources: number;
    active_logs?: number;
}

// export interface AffiliateDomainInterface {
//     id: number;
//     title: string;
//     name: string;
//     configuration: string;
//     flag: number;
//     status: number;
//     affiliate_id: number;
//     created: number;
//     updated: number;
// }
/*
 * @deprecated
 * use libs/shared/data-access/short-entity-list/src/lib/models/short-affiliate.model.ts
 * */
export interface ShortAffiliateInterface {
    id: number;
    firstname: string;
    lastname: string;
    company: string;
    company_name?: string;
    image?: string;
}

export interface AffiliateMenuInterface {
    link: string;
    count: number;
    title: string;
    countObj: string;
    roles: DefaultRoleEnum[];
    isActive?: boolean;
}

export interface AffiliateReferralSponsorInfo {
    referral_sponsor_id: number;
    referral_sponsor_name: string;
    referral_sponsor_firstname: string;
    referral_sponsor_lastname: string;
}

@JsonObject('AffiliateBalanceModel')
export class AffiliateBalanceModel {
    @JsonProperty('approved_balance', String)
    approved_balance: string = undefined;

    @JsonProperty('pending_balance', String, true)
    pending_balance?: string = undefined;

    @JsonProperty('currency', String)
    currency: CurrencyEnum = undefined;
}

// @JsonObject('AffiliatesModel')
// export class AffiliatesModel {
//     @JsonProperty('id', Number)
//     id: number = undefined;
//
//     @JsonProperty('tags_selected', String)
//     private _tags_selected: string = undefined;
//
//     get tags_selected(): any[] {
//         const parse: any[] = JSON.parse(this._tags_selected);
//         return parse.length > 0 ? parse : null;
//     }
//
//     @JsonProperty('firstname', String)
//     firstname: string = undefined;
//
//     @JsonProperty('lastname', String)
//     lastname: string = undefined;
//
//     @JsonProperty('company_name', String)
//     company_name: string = undefined;
//
//     @JsonProperty('image', String)
//     image: string = undefined;
//
//     @JsonProperty('status', Number)
//     status: number = undefined;
//
//     @JsonProperty('registration', String, Any)
//     private _registration: string = undefined;
//
//     get registration(): SignUpInfoModel {
//         return Util.jsonParse<SignUpInfoModel>(this._registration);
//     }
//
//     @JsonProperty('created', Number)
//     created: number = undefined;
//
//     @JsonProperty('managers_assigned', Any)
//     managers_assigned: Array<{ [key: string]: string }> = [];
//
//     @JsonProperty('contacts', Any)
//     contacts: ContactModel[] = [];
//
//     @JsonProperty('email', String)
//     email: string = undefined;
//
//     @JsonProperty('phone', String, true)
//     phone?: string = undefined;
//
//     @JsonProperty('live_stats', Any)
//     live_stats: TableConversionLiveStatsModel = undefined;
//
//     @JsonProperty('balances', AffiliateBalanceModel)
//     balances: AffiliateBalanceModel = undefined;
// }

// export interface AffiliatesExportParamsModel
//     extends LangRequestModel,
//         ExportFileFormatRequestModel,
//         PageRequestModel,
//         SortRequestModel,
//         StatusRequestModel,
//         ColumnsRequestModel {
//     tags?: string;
//     countries?: string;
//     managers?: string;
// }
