import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { map, Observable, takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    DASHBOARD_AFFILIATE_POSTBACK_PROVIDER,
    DashboardAffiliatePostbackQuery,
    DashboardAffiliatePostbackService
} from '@scaleo/dashboard/shared/widgets/pending-records/affiliate-postback/data-access';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-dashboard-affiliate-pending-postbacks',
    templateUrl: './dashboard-pending-affiliate-postbacks.component.html',
    providers: [DASHBOARD_AFFILIATE_POSTBACK_PROVIDER, UnsubscribeService]
})
export class DashboardPendingAffiliatePostbacksComponent implements OnInit {
    @Input()
    controlTemplate: TemplateRef<any>;

    @Input()
    infoColTemplate: TemplateRef<any>;

    readonly columns: UiSimpleTableHeaderModel[] = [
        {
            value: 'info'
        },
        {
            value: 'questions'
        }
    ];

    items$ = this.affiliatePostbackQuery.selectAll();

    notFound$: Observable<boolean> = this.items$.pipe(map((items) => !items.length));

    isLoad$ = this.affiliatePostbackQuery.selectLoading().pipe(map((loading) => !loading));

    constructor(
        private affiliatePostbackService: DashboardAffiliatePostbackService,
        private affiliatePostbackQuery: DashboardAffiliatePostbackQuery,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.affiliatePostbackService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    reload(): void {
        this.affiliatePostbackService.reload();
    }
}
