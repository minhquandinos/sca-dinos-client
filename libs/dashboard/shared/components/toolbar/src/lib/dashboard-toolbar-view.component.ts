import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { CustomDateRangeComponent } from '@scaleo/shared/components';

@Component({
    selector: 'app-dashboard-toolbar-view',
    template: `
        <div class="dashboard-grid-toolbar d-flex justify-content-center">
            <div class="dashboard-grid-toolbar__info d-flex justify-content-center align-items-center">
                <span class="color__gray3 font-size is-7"> {{ 'interface.date.based_on' | translate }} {{ timezone }} </span>
            </div>
            <div class="ml-auto">
                <app-custom-date-range
                    [startDate]="startDate | async"
                    [endDate]="endDate | async"
                    position="right"
                    (toggle)="dateWasChange($event)"
                ></app-custom-date-range>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class DashboardToolbarViewComponent implements OnInit {
    @HostBinding('class') hostClass = 'd-block';

    @ViewChild(CustomDateRangeComponent) customDateRangeComponent: CustomDateRangeComponent;

    timezone: string;

    public startDate: Observable<string> = this.dashboardToolbarService.selectedDates$.pipe(pluck('rangeFrom'));

    public endDate: Observable<string> = this.dashboardToolbarService.selectedDates$.pipe(pluck('rangeTo'));

    constructor(
        private cdr: ChangeDetectorRef,
        private translate: TranslateService,
        private dashboardWidgetService: DashboardWidgetService,
        private dashboardConfigService: DashboardConfigService,
        private dashboardToolbarService: DashboardToolbarService,
        private profileQuery: ProfileQuery,
        private platformListsService: PlatformListsService,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.initTimezone();
    }

    edit(): void {
        this.dashboardWidgetService.setTempActiveWidgets();
        this.dashboardConfigService.edit(true);
    }

    dateWasChange(event: CustomDateRangeModel): void {
        this.dashboardToolbarService.dateRange$.next(event);
    }

    private initTimezone(): void {
        const profileTimezone = this.profileQuery.profile.timezone;
        this.platformListsService
            .platformListsNew('timezones')
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((list) => {
                if (list.timezones) {
                    this.timezone = list.timezones.find((item: any) => item.timezone === profileTimezone)?.title;
                    this.cdr.markForCheck();
                }
            });
    }
}
