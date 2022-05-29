import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardWidgetService } from '@scaleo/dashboard/service';
import {
    OFFER_PROMOTE_WIDGET_PROVIDER,
    OfferPromoteWidgetCategoriesModel,
    OfferPromoteWidgetCategoriesQuery,
    OfferPromoteWidgetService
} from '@scaleo/feature-affiliate-dashboard-widgets-offer-promote-data-access';
import { UiTabChangeTabEventModel } from '@scaleo/ui-kit/elements';

@DynamicComponentLookup(DASHBOARD_WIDGET.offerPromote)
@Component({
    selector: 'app-new-hot-offer-widget',
    templateUrl: './offer-promote-widget.component.html',
    providers: [OFFER_PROMOTE_WIDGET_PROVIDER]
})
export class OfferPromoteWidgetComponent extends BaseDashboardWidgetComponent implements OnInit, AfterViewInit {
    categories$: Observable<OfferPromoteWidgetCategoriesModel[]>;

    categories: OfferPromoteWidgetCategoriesModel[];

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        protected offerPromoteWidgetService: OfferPromoteWidgetService,
        private categoryQuery: OfferPromoteWidgetCategoriesQuery
    ) {
        super(dashboardConfigService, dashboardWidgetService, offerPromoteWidgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.offerPromoteWidgetService.widgetData$.pipe(takeUntil(this.unsubscribe)).subscribe();

        this.categories$ = this.categoryQuery.selectAll().pipe(
            tap((categories) => {
                this.categories = categories;
            })
        );
    }

    ngAfterViewInit(): void {
        this.setContainerWidgetFooterBorderTop();
    }

    changeTab({ index }: UiTabChangeTabEventModel) {
        this.offerPromoteWidgetService.setLoading(true);
        const newTab = this.categories[index];
        this.offerPromoteWidgetService.updateFilter(newTab.category_id);
    }

    trackByFn(index: number, item: OfferPromoteWidgetCategoriesModel): number {
        return item.category_id;
    }
}
