import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, takeUntil, tap } from 'rxjs/operators';

import { ActivityLogInterface } from '@scaleo/activity-log/common';
import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { ContainerWidgetComponent } from '@scaleo/dashboard/shared/components/container-widget';
import { NotificationWidgetService } from '@scaleo/dashboard/shared/widgets/notification/data-access';
import { Filter2Interface } from '@scaleo/shared/services/filters';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';

@DynamicComponentLookup(DASHBOARD_WIDGET.notifications)
@Component({
    selector: 'app-notifications-widget',
    templateUrl: './notifications-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NotificationWidgetService]
})
export class NotificationsWidgetComponent extends BaseDashboardWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    items$: Observable<ApiResponseWithPagination<ActivityLogInterface>>;

    isLoad = false;

    @ViewChild('containerTable', { static: true }) private containerTable: ElementRef;

    @ViewChild(ContainerWidgetComponent, { static: true }) private containerWidgetComponent: ContainerWidgetComponent;

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        private cdr: ChangeDetectorRef,
        public shared: SharedMethodsService,
        private notificationWidgetService: NotificationWidgetService
    ) {
        super(dashboardConfigService, dashboardWidgetService, notificationWidgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.notificationWidgetService.widgetFilters$.next(this.initFilters);
        this.items$ = this.notificationWidgetService.widgetData$.pipe(
            tap(() => {
                this.isLoad = false;
            }),
            map((items) => items),
            tap(() => {
                this.isLoad = true;
            }),
            share()
        );
    }

    ngAfterViewInit(): void {
        this.createWidgetAction()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((action) => {
                this.dashboardWidgetService.activeInactiveWidget(action, this.widget);
            });
        this.cdr.detectChanges();
        this.setContainerWidgetFooterBorderTop();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private get initFilters(): Filter2Interface {
        return {
            params: {
                role: '',
                sortField: 'added_timestamp',
                sortDirection: 'desc',
                page: 1,
                perPage: 20,
                lang: this.translateService.currentLang ? this.translateService.currentLang : localStorage.getItem('lang')
            }
        };
    }
}
