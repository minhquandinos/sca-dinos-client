import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { DashboardWidgetsConfigQuery, DashboardWidgetsConfigService } from '@scaleo/dashboard/data-access';
import { DashboardWidgetService } from '@scaleo/dashboard/service';
import { animationRules } from '@scaleo/shared/animations';

@Component({
    selector: 'scaleo-dashboard-page',
    template: `
        <scaleo-dashboard-skeleton *ngIf="loading$ | async"></scaleo-dashboard-skeleton>
        <app-dashboard-grid
            *ngIf="isLoad$ | async"
            [@fade]
            [activeWidgets]="activeWidgets$ | async"
            [inactiveWidgets]="inactiveWidgets$ | async"
        ></app-dashboard-grid>
    `,
    animations: [animationRules.fade()],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class ManagerDashboardPageComponent implements OnInit {
    activeWidgets$ = this.dashboardWidgetsConfigQuery.activeWidgets$;

    inactiveWidgets$ = this.dashboardWidgetsConfigQuery.inactiveWidgets$;

    loading$ = this.dashboardWidgetsConfigQuery.loading$;

    isLoad$ = this.dashboardWidgetsConfigQuery.isLoad$;

    constructor(
        private readonly dashboardWidgetsConfigService: DashboardWidgetsConfigService,
        private readonly dashboardWidgetsConfigQuery: DashboardWidgetsConfigQuery,
        private readonly dashboardWidgetService: DashboardWidgetService,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.dashboardWidgetsConfigService.config().pipe(takeUntil(this.unsubscribe)).subscribe();
    }
}
