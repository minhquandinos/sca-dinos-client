import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { map, Observable, takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    DASHBOARD_OFFER_REQUEST_PROVIDER,
    DashboardOfferRequestQuery,
    DashboardOfferRequestService
} from '@scaleo/dashboard/shared/widgets/pending-records/offer-request/data-access';
import { UiButtonLinkComponent, UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-dashboard-pending-offer',
    templateUrl: './dashboard-pending-offer-requests.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [DASHBOARD_OFFER_REQUEST_PROVIDER, UnsubscribeService]
})
export class DashboardPendingOfferRequestsComponent implements OnInit {
    @HostBinding('class') hostClass = 'dashboard-pending-offer-requests';

    @Input()
    controlTemplate: TemplateRef<any>;

    @Input()
    previewColTemplate: TemplateRef<any>;

    @Input()
    infoColTemplate: TemplateRef<any>;

    items$ = this.dashboardOfferRequestQuery.selectAll();

    notFound$: Observable<boolean> = this.items$.pipe(map((items) => !items.length));

    isLoad$ = this.dashboardOfferRequestQuery.selectLoading().pipe(map((loading) => !loading));

    @ViewChildren('allowRef') protected allowRef: QueryList<UiButtonLinkComponent>;

    @ViewChildren('denyRef') protected denyRef: QueryList<UiButtonLinkComponent>;

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'info'
        },
        {
            value: 'preview'
        }
    ];

    constructor(
        private dashboardOfferRequestService: DashboardOfferRequestService,
        private dashboardOfferRequestQuery: DashboardOfferRequestQuery,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.dashboardOfferRequestService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    reload() {
        this.dashboardOfferRequestService.reload();
    }
}
