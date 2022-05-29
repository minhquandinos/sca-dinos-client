import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { ActivityLogInterface, ActivityLogRequestModel } from '@scaleo/activity-log/common';
import { ActivityLogApi } from '@scaleo/activity-log/data-access';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { WidgetFiltersInterface, WidgetServiceInterface } from '@scaleo/dashboard/common';
import { Filter2Interface } from '@scaleo/shared/services/filters';

@Injectable()
export class NotificationWidgetService
    implements WidgetServiceInterface<ApiResponseWithPagination<ActivityLogInterface>>, WidgetFiltersInterface
{
    widgetSubject$: Subject<any> = new Subject<any>();

    widgetFilters$: BehaviorSubject<Filter2Interface> = new BehaviorSubject<Filter2Interface>(null);

    constructor(private activityLogService: ActivityLogApi) {}

    get widgetData$(): Observable<ApiResponseWithPagination<ActivityLogInterface>> {
        return this.widgetSubject$.pipe(
            startWith(''),
            switchMap(() => this.widgetFilters$),
            // TODO refactor filters on AbstractActivityLogComponent later ( change GetFilterInterface to ActivityLogRequestModel)
            switchMap((filters) => this.activityLogService.index(filters.params as ActivityLogRequestModel))
        );
    }
}
