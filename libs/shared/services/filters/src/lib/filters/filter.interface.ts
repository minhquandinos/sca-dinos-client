import { HeaderFilterType, ManagerRoleType, OrderByType, SortByType, StatusType } from '@scaleo/core/data';

export interface FilterInterface {
    sortField?: OrderByType;
    sortDirection?: SortByType;
    status?: StatusType;
    search?: string;
    type?: HeaderFilterType;
    onlyMine?: string;
    countries?: string;
    tags?: string;
    managers?: string;
    page?: any;
    perPage?: any;
    countries_model?: any;
    managers_model?: any;
    tags_model?: any;
    role?: ManagerRoleType;
    header_menu?: HeaderFilterType;
    account_type?: 'advertiser' | 'affiliate';
    advertisers?: string;
    affiliates?: string;
    filters_model?: any;
    columns?: string;
    exact?: string;
}

export interface FilterCopyInterface {
    page?: number;
    perPage?: number;
    sortField?: OrderByType;
    sortDirection?: SortByType;
    status?: StatusType;
    search?: string;
    type?: HeaderFilterType;
    onlyMine?: string;
    countries?: any;
    tags?: any;
    managers?: any;
    role?: ManagerRoleType;
    advertisers?: any;
    affiliates?: any;
    goals_types?: any;
    goals?: any;
    headerFilter?: HeaderFilterType;
    filters?: FiltersModelInterface;
    postFilters?: PostFiltersInterface;
    columns?: string;
    onlyNew?: 'yes' | '';
    onlyFeatured?: 'yes' | '';
    exact?: string;
    level?: string;
}

export interface FiltersModelInterface {
    countries?: any;
    managers?: any;
    tags?: any;
    advertisers?: any;
    goals_types?: any;
}

export interface SimpleFilterInterface {
    perPage?: number;
    search?: string;
    status?: string;
}

export interface PostFiltersInterface {
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
    filters?: RequestPayloadFilterInterface;
}

export interface RequestPayloadFilterInterface {
    [key: string]: number[];
}
