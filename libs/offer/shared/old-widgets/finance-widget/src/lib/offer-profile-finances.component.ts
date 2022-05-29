import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { DashboardSummaryService } from '@scaleo/dashboard-old/shared/widgets/summary/data-access';

@Component({
    selector: 'scaleo-offer-finances-old-widget',
    template: `
        <app-dashboard-summary
            [showLegend]="false"
            [haveBorderBottom]="false"
            [title]="'dashboard_page.trends' | translate"
        ></app-dashboard-summary>
    `
})
export class OfferProfileFinancesComponent implements OnInit, OnDestroy {
    @Input() id: number;

    constructor(private dashboardSummaryService: DashboardSummaryService) {
        this.dashboardSummaryService.localStorageName.next('scaleo_offer_chart');
    }

    ngOnInit(): void {
        this.dashboardSummaryService.chartFilters.next({ offers: this.id });
    }

    ngOnDestroy() {
        this.dashboardSummaryService.chartFilters.next(null);
        this.dashboardSummaryService.localStorageName.next(null);
    }
}
