import { FilterCopyInterface } from '@scaleo/shared/services/filters';

export interface StatisticInterface {
    [key: string]: string | Date | number;
}

export interface StatisticFiltersInterface {
    rangeFrom?: string;
    rangeTo?: string;
    columns?: string;
    statuses?: string;
    transactions?: string;
    ips?: string;
    trackIds?: string;
}

export interface StatisticGroupFiltersInterface {
    getFilters?: FilterCopyInterface;
    postFilters?: StatisticFiltersInterface;
}
