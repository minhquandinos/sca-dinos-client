import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { BaseWidgetService, WidgetFiltersInterface, WidgetServiceInterface } from '@scaleo/dashboard/common';
import { DashboardToolbarService } from '@scaleo/dashboard/service';
import { TopAffiliatesApi } from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/api';
import {
    TOP_AFFILIATES_REVENUE_FIELD,
    TopAffiliatesRequestDtoType,
    WidgetTopAffiliateRowsModel
} from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/common';
import { FormatService } from '@scaleo/platform/format/service';

@Injectable()
export class TopAffiliateWidgetService
    extends BaseWidgetService
    implements WidgetServiceInterface<WidgetTopAffiliateRowsModel[]>, WidgetFiltersInterface
{
    widgetSubject$: Subject<void> = new Subject<void>();

    // TODO create abstract base-top-widget.service and move code, and refactor current service
    widgetFilters$: BehaviorSubject<TopAffiliatesRequestDtoType> = new BehaviorSubject<TopAffiliatesRequestDtoType>({
        params: {
            sortField: TOP_AFFILIATES_REVENUE_FIELD,
            sortDirection: 'desc',
            perPage: 6,
            page: 1,
            rangeFrom: '',
            rangeTo: '',
            preset: ''
        },
        payload: {
            filters: undefined
        }
    });

    currentDate$: Observable<string> = this.setCurrentPeriod(this.translate, this.formatService);

    constructor(
        protected readonly dashboardToolbarService: DashboardToolbarService,
        private readonly translate: TranslateService,
        private readonly formatService: FormatService,
        private readonly api: TopAffiliatesApi
    ) {
        super(dashboardToolbarService);
    }

    get widgetData$(): Observable<WidgetTopAffiliateRowsModel[]> {
        return this.widgetSubject$.pipe(
            startWith(''),
            switchMap(() => combineLatest([this.dashboardToolbarService.dateRange$, this.widgetFilters$])),
            map(([date, filter]) => ({
                ...filter,
                params: {
                    ...filter.params,
                    rangeFrom: date.rangeFrom,
                    rangeTo: date.rangeTo,
                    preset: date.selectedRange
                },
                payload: {
                    ...filter.payload
                }
            })),
            switchMap((filters) => this.api.index(filters))
        );
    }
}
