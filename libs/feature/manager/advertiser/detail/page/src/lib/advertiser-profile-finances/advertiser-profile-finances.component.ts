import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { DashboardSummaryService } from '@scaleo/dashboard-old/shared/widgets/summary/data-access';

@Component({
    selector: 'app-advertiser-profile-finances',
    template: `
        <app-dashboard-summary
            [haveBorderBottom]="false"
            [showLegend]="false"
            [title]="'dashboard_page.trends' | translate"
        ></app-dashboard-summary>
    `
})
export class AdvertiserProfileFinancesComponent implements OnInit, OnDestroy {
    @Input() id: number;

    constructor(private dashboardSummaryService: DashboardSummaryService) {
        this.dashboardSummaryService.localStorageName.next('scaleo_advertiser_chart');
    }

    ngOnInit(): void {
        this.dashboardSummaryService.chartFilters.next({ advertisers: this.id });
    }

    ngOnDestroy() {
        this.dashboardSummaryService.chartFilters.next(null);
        this.dashboardSummaryService.localStorageName.next(null);
    }
}
