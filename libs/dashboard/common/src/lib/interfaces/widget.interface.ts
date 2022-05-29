import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';

// import { Filter2Interface } from '@scaleo/shared/services/filters';
import { DashboardWidgetSettingsModel } from '../model/dashboard-config.model';

export class WidgetServiceInterface<T> {
    widgetSubject$: Subject<void>;

    get widgetData$(): Observable<T> | Observable<ApiResponseWithPagination<T>> {
        return null;
    }
}

export class WidgetFiltersInterface {
    widgetFilters$: BehaviorSubject<BaseObjectModel> = new BehaviorSubject<BaseObjectModel>(null);
}

export class WidgetSettingsInterface {
    widgetSettings$: BehaviorSubject<DashboardWidgetSettingsModel> = new BehaviorSubject<DashboardWidgetSettingsModel>(null);
}
