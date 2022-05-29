import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { GetFilterInterface } from '@scaleo/shared/services/filters';

import { ExtendedValuesType } from './models/report-filters-selected-composite-filter.model';
import { ReportFiltersSelectedCompositeFilterApi } from './report-filters-selected-composite-filter.api';

@Injectable()
export class ReportFiltersSelectedCompositeFilterService {
    constructor(private api: ReportFiltersSelectedCompositeFilterApi) {}

    private static filterFactory(filter: ReportFilterFilterEnum): { pluckKey: string; endpoint: string } {
        let pluckKey: string;
        let endpoint: string;
        switch (filter) {
            case ReportFilterFilterEnum.Goal:
                pluckKey = 'goals';
                endpoint = 'offers-goals-extended-filter-info';
                break;
            case ReportFilterFilterEnum.LandingPage:
                pluckKey = 'urls';
                endpoint = 'offers-urls-extended-filter-info';
                break;
            case ReportFilterFilterEnum.Creative:
                pluckKey = 'creatives';
                endpoint = 'offers-creatives-extended-filter-info';
                break;
            case ReportFilterFilterEnum.AffiliateSource:
                pluckKey = 'sources';
                endpoint = 'affiliate-sources-extended-filter-info';
                break;
            default:
                break;
        }

        return {
            pluckKey,
            endpoint
        };
    }

    public fetch(params: GetFilterInterface, filter: ReportFilterFilterEnum): Observable<ApiResponseWithPagination<ExtendedValuesType[]>> {
        return this.getExtendedFilterInfo(params, filter);
    }

    private getExtendedFilterInfo(
        params: GetFilterInterface,
        filter: ReportFilterFilterEnum
    ): Observable<ApiResponseWithPagination<ExtendedValuesType[]>> {
        const { pluckKey, endpoint } = ReportFiltersSelectedCompositeFilterService.filterFactory(filter);
        return this.api.getExtendedFilterInfo(params, pluckKey, endpoint);
    }
}
