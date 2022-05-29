import { HeaderFilterType, ManagerRoleType, OrderByType, ShortResponseInterface, SortByType, StatusType } from '@scaleo/core/data';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';

// TODO refactor
/*
 * @deprecated
 * */
export interface LocalStorageFilterInterface {
    payload?: any;
    params?: any;
}

// TODO refactor
/*
 * @deprecated
 *
 * */
export interface Filter2Interface {
    payload?: Post2FiltersInterface;
    params?: GetFilterInterface;
}

// TODO refactor
/*
 * @deprecated
 * */
export interface GetFilterInterface {
    page?: number;
    perPage?: number;
    sortField?: OrderByType | string;
    sortDirection?: SortByType;
    status?: StatusType | any;
    search?: string;
    type?: HeaderFilterType;
    onlyMine?: string;
    countries?: any;
    tags?: any;
    managers?: any;
    role?: ManagerRoleType;
    advertisers?: any;
    affiliates?: any;
    offers?: ShortResponseInterface[];
    goals_types?: any;
    goals?: any;
    rangeFrom?: string;
    rangeTo?: string;
    columns?: string;
    onlyNew?: 'yes' | '';
    onlyFeatured?: 'yes' | '';
    headerFilter?: HeaderFilterType;
    goalsTypes?: any;
    lang?: string;
    exact?: string;
    level?: string;
    format?: string;
    affiliate?: string;
    offer?: string;
    advertiser?: string;
    preset?: CustomDateRangeTitleEnum;
    currency?: CurrencyEnum;
    category_id?: number;
    onMyOffers?: string;
    active_managers?: number;
    fieldsType?: string;
    visible_type?: any[]; // TODO PlatformListAffiliateVisibilityModel
    visibility?: any[]; // TODO remove PlatformListAffiliateVisibilityModel
    except?: number;
    campaigns?: ShortResponseInterface[];
    exclude_role?: DefaultRoleEnum;
    paymentMethods?: any; // TODO add type
    affiliate_ids?: string;
    invoice_frequency?: ShortResponseInterface[];
    payment_terms?: ShortResponseInterface[];
    payment_methods?: ShortResponseInterface[];
    payments_methods?: ShortResponseInterface[] | string;
    currencies?: string;
    [key: string]: any;
}

// TODO refactor
/*
 * @deprecated
 * */
export interface Post2FiltersInterface {
    rangeFrom?: string;
    rangeTo?: string;
    columns?: string;
    statuses?: string;
    offers?: string;
    goals?: string;
    affiliates?: string;
    advertisers?: string;
    transactions?: string;
    clickIds?: string;
    ips?: string;
    trackIds?: string;
    subIds?: string;
    breakdown?: string;
    breakdowns?: string;
    filters?: RequestPayloadFilter2Interface;
    new_status?: number;
    fire_postbacks?: number;
    preset?: CustomDateRangeTitleEnum;
    logType?: any; //TODO nx LeadsLogType
}

export interface RequestPayloadFilter2Interface {
    [key: string]: any;
}
