import { Injectable } from '@angular/core';
import { debounceTime, Observable, of } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { RestApiService } from '@scaleo/core/rest-api/service';
import { ReportFiltersInterface } from '@scaleo/reports/shared/filters/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { rxjsOperatorsUtil } from '@scaleo/utils';

import { BaseReportApiInterface } from './interfaces/base-report-api.interface';
import { ReportPagesEnum } from './model/reports.model';

@Injectable({
    providedIn: 'root'
})
export class BaseReportApi implements BaseReportApiInterface {
    constructor(protected rest: RestApiService, protected pageType: ReportPagesEnum | 'leads-list') {}

    get getColumnsOptions$(): Observable<ConfigTableColumn2Model[]> {
        const urls = {
            [ReportPagesEnum.Statistics]: '',
            [ReportPagesEnum.Clicks]: '',
            [ReportPagesEnum.AffiliatesPostbacks]: '',
            [ReportPagesEnum.AdvertiserPostbacks]: '',
            [ReportPagesEnum.InvalidClicks]: '',
            [ReportPagesEnum.Conversions]: ''
        };

        return this.rest.get<ConfigTableColumn2Model[]>((urls as any)[this.pageType]).pipe(pluck('info', 'columns-list'));
    }

    get getFilters$(): Observable<ReportFiltersInterface[]> {
        const urlsMap: BaseObjectModel = {
            [ReportPagesEnum.Statistics]: 'reports-statistic-filters',
            [ReportPagesEnum.Clicks]: 'reports-clicks-filters',
            [ReportPagesEnum.AffiliatesPostbacks]: 'reports-affiliate-postbacks-filters',
            [ReportPagesEnum.AdvertiserPostbacks]: 'reports-advertiser-postbacks-filters',
            [ReportPagesEnum.InvalidClicks]: 'reports-clicks-log-filters',
            [ReportPagesEnum.Conversions]: 'reports-conversions-filters',
            'leads-list': 'leads-list-filters'
        };

        const url = urlsMap?.[this.pageType];

        if (!url) {
            return of([]);
        }

        return this.rest.get<ReportFiltersInterface[]>(url).pipe(
            map(({ info = {} }) => info['filters-list']),
            debounceTime(300),
            rxjsOperatorsUtil.emptyResponseOnCatchError([])
        );
    }
}
