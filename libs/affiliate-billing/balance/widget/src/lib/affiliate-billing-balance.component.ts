import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { debounceTime, Observable } from 'rxjs';
import { filter, map, pluck, takeUntil } from 'rxjs/operators';

import {
    AffiliateBillingBalanceModel,
    AffiliateBillingBalanceQuery,
    AffiliateBillingBalanceService,
    BalanceDueByCurrencyModel,
    BILLING_BALANCE_PROVIDER
} from '@scaleo/affiliate-billing/balance/data-access';
import { ResizeObserverService } from '@scaleo/core/resize-observer/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'app-affiliate-billing-balance',
    templateUrl: './affiliate-billing-balance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BILLING_BALANCE_PROVIDER, UnsubscribeService, ResizeObserverService]
})
export class AffiliateBillingBalanceComponent implements OnInit, OnDestroy {
    @Input()
    affiliateId: number;

    @Input()
    showPendingBalance: boolean;

    @HostBinding('class') hostClass = 'd-block affiliate-billing-balance';

    readonly balance$: Observable<AffiliateBillingBalanceModel> = this.affiliateBillingBalanceQuery.select();

    readonly showBalanceDueByCurrency$: Observable<boolean>;

    @ViewChild('affiliateBillingContainer', { static: true })
    affiliateBillingContainerRef: ElementRef;

    showPendingBalanceBlock = false;

    constructor(
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly affiliateBillingBalanceService: AffiliateBillingBalanceService,
        private readonly affiliateBillingBalanceQuery: AffiliateBillingBalanceQuery,
        public readonly host: ElementRef,
        private readonly unsubscribe: UnsubscribeService,
        private readonly resizeObserverService: ResizeObserverService,
        private readonly cdr: ChangeDetectorRef
    ) {
        this.showBalanceDueByCurrency$ = this.getShowBalanceDueByCurrency$;
    }

    ngOnInit(): void {
        this.affiliateBillingBalanceService.show(this.affiliateId).pipe(takeUntil(this.unsubscribe)).subscribe();

        this.resizeObserverService
            .observe(this.host.nativeElement)
            .pipe(
                filter((host) => !!host),
                debounceTime(300),
                map(() => this.renderPendingBalanceBlock),
                takeUntil(this.unsubscribe)
            )
            .subscribe((show) => {
                this.showPendingBalanceBlock = show;
                this.cdr.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.resizeObserverService.ngOnDestroy();
    }

    reload(): void {
        this.affiliateBillingBalanceService.reload();
    }

    private get getShowBalanceDueByCurrency$(): Observable<boolean> {
        return this.balance$.pipe(
            pluck('balance_due_by_currencies'),
            filter((balances) => !!balances),
            map(
                (balances: BalanceDueByCurrencyModel[]) =>
                    (balances.length === 1 && balances[0].currency !== this.platformSettingsQuery.settings.currency) || balances.length > 1
            )
        );
    }

    private get renderPendingBalanceBlock(): boolean {
        if (this.showPendingBalance !== undefined) {
            return this.renderOfPageWidth && this.showPendingBalance;
        }

        return this.renderOfPageWidth;

        // const { aff_hide_pending_and_rejected_transactions: prt, show_the_balance_of_pending_conversions: bpc } =
        //     this.settingsQuery.settings;
        // return (this.renderOfPageWidth && bpc && !prt) || (!this.renderOfPageWidth && bpc && prt);

        // switch (this.profile.role) {
        //     case RoleEnum.Affiliate:
        //         return (this.renderOfPageWidth && bpc && !prt) || (!this.renderOfPageWidth && bpc && prt);
        //     case RoleEnum.Admin:
        //     case RoleEnum.Manager:
        //         return this.renderOfPageWidth && bpc;
        //     case RoleEnum.LimitedAffiliateManager:
        //         return bpc;
        //     default:
        //         return false;
        // }
    }

    private get renderOfPageWidth(): boolean {
        const wrapperContentWidth = this.host.nativeElement.offsetWidth;
        const affiliateBillingContainerWidth = this.affiliateBillingContainerRef.nativeElement.offsetWidth;

        return wrapperContentWidth >= affiliateBillingContainerWidth;
    }
}
