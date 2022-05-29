import { Component, OnInit } from '@angular/core';
import { map, Observable, pluck, takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_ACTIVITY_LOG_LIST_PROVIDER,
    AffiliateActivityLogListQuery,
    AffiliateActivityLogListService
} from '@scaleo/feature/affiliate/activity-log/list/data-access';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';

@Component({
    selector: 'scaleo-affiliate-activity-list',
    templateUrl: './affiliate-activity-list.component.html',
    providers: [AFFILIATE_ACTIVITY_LOG_LIST_PROVIDER, UnsubscribeService]
})
export class AffiliateActivityListComponent implements OnInit {
    items$ = this.affiliateActivityLogListQuery.selectAll();

    pagination$ = this.affiliateActivityLogListQuery.selectDataValue$('pagination');

    totalCount$ = this.pagination$.pipe(pluck('total_count'));

    loading$ = this.affiliateActivityLogListQuery.selectLoading();

    initialData$: Observable<CustomDateRangeModel> = this.affiliateActivityLogListQuery.selectParams$().pipe(
        map(({ rangeFrom, rangeTo }) => {
            return {
                rangeFrom,
                rangeTo
            };
        })
    );

    readonly headers: string[] = ['added_timestamp', 'event'];

    constructor(
        private readonly affiliateActivityLogListService: AffiliateActivityLogListService,
        private readonly affiliateActivityLogListQuery: AffiliateActivityLogListQuery,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.affiliateActivityLogListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    dateWasChanged({ rangeFrom, rangeTo }: CustomDateRangeModel): void {
        this.affiliateActivityLogListService.updateParamsValue({ rangeFrom, rangeTo });
    }

    pageWasChanged(page: number): void {
        this.affiliateActivityLogListService.updateParamsValue({ page });
    }

    perPageWasChange(perPage: number): void {
        this.affiliateActivityLogListService.updateParamsValue({ perPage });
    }
}
