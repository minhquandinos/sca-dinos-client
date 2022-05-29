import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { BaseWidgetService, WidgetFiltersInterface, WidgetServiceInterface } from '@scaleo/dashboard/common';
import { DashboardToolbarService } from '@scaleo/dashboard/service';
import { WidgetTopOfferRowsModel } from '@scaleo/dashboard/shared/widgets/top/components/offer/data-access';
import { FormatService } from '@scaleo/platform/format/service';

@Injectable()
export class TopOfferWidgetService
    extends BaseWidgetService
    implements WidgetServiceInterface<WidgetTopOfferRowsModel[]>, WidgetFiltersInterface
{
    widgetSubject$: Subject<any> = new Subject<any>();

    // TODO create abstract base-top-widget.service and move code, and refactor current service
    widgetFilters$: BehaviorSubject<BaseObjectModel> = new BehaviorSubject<BaseObjectModel>({});

    currentDate$: Observable<string> = this.setCurrentPeriod(this.translate, this.formatService);

    constructor(
        protected dashboardToolbarService: DashboardToolbarService,
        private translate: TranslateService,
        private formatService: FormatService
    ) {
        super(dashboardToolbarService);
    }

    get widgetData$(): Observable<WidgetTopOfferRowsModel[]> {
        return this.widgetSubject$.pipe(startWith(undefined));
    }
}
