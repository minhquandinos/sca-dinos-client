/*
 * @deprecated
 * */
import { PlatformListsFormatModel, PlatformListStatusModel } from './platform-list.model';

export interface PlatformListsFormatInterface {
    id: number | string;
    title: string;
    title_ru?: string;
    title_en?: string;
    value?: string;
    disabled?: any;
    role?: string;
    timezone?: string;
    name?: string;
    key?: string;
}

export interface PlatformListsFormatAdjustmentConditionsInterface {
    id: string;
    title: string;
}

export interface PlatformListsBaseInterface {
    code: string;
    title: string;
}
/*
 * @deprecated use PlatformListModel
 * */
export interface PlatformListsInterface {
    media_types?: PlatformListsFormatInterface[];
    traffic_types?: PlatformListsFormatInterface[];
    payment_terms?: PlatformListsFormatInterface[];
    payment_systems?: PlatformListsFormatInterface[];
    messengers?: PlatformListsFormatInterface[];
    affiliates_tags?: PlatformListsFormatInterface[];
    statuses?: PlatformListStatusModel[];
    currencies?: PlatformListsBaseInterface[];
    languages?: PlatformListsBaseInterface[];
    timezones?: PlatformListsFormatInterface[];
    roles?: PlatformListsFormatInterface[];
    datetime_formats?: PlatformListsBaseInterface[];
    themes?: any;
    payment_statuses?: PlatformListStatusModel[];
    per_pages?: PlatformListsFormatInterface[];
    postback_levels?: PlatformListsFormatInterface[];
    conversion_statuses?: PlatformListStatusModel[];
    tracking_methods?: PlatformListsFormatInterface[];
    offers_statuses?: PlatformListStatusModel[];
    goals_types?: PlatformListsFormatInterface[];
    goals_statuses?: PlatformListStatusModel[];
    offer_urls_types?: PlatformListsFormatInterface[];
    offer_urls_statuses?: PlatformListStatusModel[];
    offers_targeting_rules?: PlatformListsFormatInterface[];
    creatives_types?: PlatformListsFormatInterface[];
    creatives_statuses?: PlatformListStatusModel[];
    affiliate_visibility?: PlatformListsFormatInterface[];
    goals_caps_types?: PlatformListsFormatInterface[];
    goals_caps_periods?: PlatformListsFormatInterface[];
    connection_types?: PlatformListsFormatInterface[];
    device_types?: PlatformListsFormatInterface[];
    offers_visibility?: PlatformListsFormatInterface[];
    forwarding_types?: PlatformListsFormatInterface[];
    number_formats?: PlatformListsFormatInterface[];
    date_formats?: PlatformListsFormatInterface[];
    postback_tracking_methods?: PlatformListsFormatInterface[];
    goal_tracking_methods?: PlatformListsFormatInterface[];
    postback_statuses?: PlatformListStatusModel[];
    adjustments_statuses?: PlatformListStatusModel[];
    adjustments_actions?: PlatformListsFormatInterface[];
    adjustments_conditions?: PlatformListsFormatAdjustmentConditionsInterface[];
    adjustments_optional_parameters?: PlatformListsFormatAdjustmentConditionsInterface[];
    custom_params_statuses?: PlatformListStatusModel[];
    custom_params_types?: PlatformListsFormatInterface[];
    custom_params_conditions?: PlatformListsFormatInterface[];
    custom_params_actions?: PlatformListsFormatInterface[];
    payments_types?: PlatformListsFormatInterface[];
    payments_frequencies?: PlatformListsFormatInterface[];
    payments_methods_statuses?: PlatformListStatusModel[];
    redirects_reasons?: PlatformListsFormatInterface[];
    leads_receive_validations_type_duplicate_offer?: PlatformListsFormatModel[];
    leads_receive_validations_type_duplicate_all_offer?: PlatformListsFormatModel[];
    leads_receive_validations_type_format?: PlatformListsFormatModel[];
    leads_receive_fields?: PlatformListsFormatInterface[];
    invoices_frequencies_for_filter?: PlatformListsFormatInterface[];
    invoices_payments_terms_for_filter?: PlatformListsFormatInterface[];
}

export enum PlatformListsStatusesEnum {
    Status = 0,
    Active = 1,
    Pending = 2,
    Inactive = 3,
    Rejected = 4,
    Deleted = 5
}

export enum PlatformListsStatusesNameEnum {
    EmptyStatus = '',
    Status = 'status',
    Default = 'default',
    Active = 'active',
    Pending = 'pending',
    Inactive = 'inactive',
    Rejected = 'rejected'
}
