import { Component, OnInit } from '@angular/core';
import { map, Observable, pluck, takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    ADVERTISER_ACTIVITY_LOG_LIST_PROVIDER,
    AdvertiserActivityLogListQuery,
    AdvertiserActivityLogListService
} from '@scaleo/feature/advertiser/activity-log/list/data-access';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';

@Component({
    selector: 'scaleo-affiliate-activity-list',
    templateUrl: './advertiser-activity-list.component.html',
    providers: [ADVERTISER_ACTIVITY_LOG_LIST_PROVIDER, UnsubscribeService]
})
export class AdvertiserActivityListComponent implements OnInit {
    items$ = this.activityLogListQuery.selectAll();

    pagination$ = this.activityLogListQuery.selectDataValue$('pagination');

    totalCount$ = this.pagination$.pipe(pluck('total_count'));

    loading$ = this.activityLogListQuery.selectLoading();

    initialData$: Observable<CustomDateRangeModel> = this.activityLogListQuery.selectParams$().pipe(
        map(({ rangeFrom, rangeTo }) => {
            return {
                rangeFrom,
                rangeTo
            };
        })
    );

    readonly headers: string[] = ['added_timestamp', 'event'];

    constructor(
        private readonly activityLogListService: AdvertiserActivityLogListService,
        private readonly activityLogListQuery: AdvertiserActivityLogListQuery,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.activityLogListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    dateWasChanged({ rangeFrom, rangeTo }: CustomDateRangeModel): void {
        this.activityLogListService.updateParamsValue({ rangeFrom, rangeTo });
    }

    pageWasChanged(page: number): void {
        this.activityLogListService.updateParamsValue({ page });
    }

    perPageWasChange(perPage: number): void {
        this.activityLogListService.updateParamsValue({ perPage });
    }
}
