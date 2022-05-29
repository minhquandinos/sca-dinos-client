import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { DateUtil } from '@scaleo/platform/date/util';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { StatisticInterface } from '@scaleo/reports/common';
import { ReportStatisticsService } from '@scaleo/reports/statistic/data-access';
import { Filter2Interface } from '@scaleo/shared/services/filters';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';

class StatisticPerformancePagination<T> extends ApiResponseWithPagination<T> {
    results: StatisticPerformanceInterface<T>;
}

class StatisticPerformanceInterface<T> {
    totals: StatisticInterface;

    rows: Array<T>;

    breakdownsColumns: BreakdownsColumnsInterface;
}

interface BreakdownsColumnsInterface {
    label: string;
    columns: string[];
    breakdown: string;
}

@Component({
    selector: 'scaleo-offer-short-statistics-old-widget',
    templateUrl: './offer-profile-short-statistics.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferProfileShortStatisticsComponent implements OnInit {
    @Input() id: number;

    @Input() columns = 'clicks,cv_approved,cv_pending,cr,approved_payout';

    @Input() set customRowTemplate(template: TemplateRef<any>) {
        if (template) {
            this.rowTemplate = template;
        }
    }

    @Input() set checkCrColumn(status: boolean) {
        const canSeePendingConversions = this.checkPermissionService.check(this.permissions.canSeePendingConv);
        this.showTrInsteadCr = status && !canSeePendingConversions;
    }

    @Input() headers = ['date', 'clicks', 'cv_approved', 'cv_pending', 'cr', 'approved_payout'];

    @Input()
    payoutColumnFor: 'affiliate' | 'advertiser';

    @ViewChild('defaultTemplate') defaultTemplate: TemplateRef<any>;

    rowTemplate: TemplateRef<any>;

    items$: Observable<StatisticPerformancePagination<StatisticPerformanceInterface<StatisticInterface>>>;

    isLoad = false;

    showTrInsteadCr: boolean;

    constructor(
        public shared: SharedMethodsService,
        private reportStatisticsService: ReportStatisticsService,
        private customDateRangeService: CustomDateRangeService,
        private router: Router,
        private profileQuery: ProfileQuery,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.initStatistics();
        // this.checkCrColumn();
        this.rowTemplate = this.defaultTemplate;
    }

    initStatistics(): void {
        const filter: Filter2Interface = {
            params: {
                sortField: 'added_date',
                sortDirection: 'desc',
                page: 1,
                perPage: 25
            },
            payload: {
                rangeFrom: DateUtil.moment(new Date()).subtract(13, 'd').format(this.customDateRangeService.serverFormat),
                rangeTo: DateUtil.endOf(new Date(), 'day'),
                breakdown: 'day',
                breakdowns: 'day',
                columns: this.columns,
                filters: { offers: this.id }
            }
        };

        this.items$ = this.reportStatisticsService.list(filter).pipe(
            tap(() => {
                this.isLoad = true;
            }),
            share()
        );
    }

    navigate(): void {
        this.router.navigate([`/${this.profileQuery.slug}/reports/statistics/offer`], {
            queryParams: {
                id: this.id
            }
        });
    }

    get columnsAsArray(): string[] {
        return this.columns.split(',');
    }
}
