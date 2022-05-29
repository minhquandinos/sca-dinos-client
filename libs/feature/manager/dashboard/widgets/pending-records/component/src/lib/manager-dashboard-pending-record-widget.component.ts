import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, Observable, of, pluck } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { DashboardPendingAffiliatePostbacksComponent } from '@scaleo/dashboard/shared/widgets/pending-records/affiliate-postback/component';
import { DASHBOARD_PENDING_RECORDS_INNER_WIDGET } from '@scaleo/dashboard/shared/widgets/pending-records/common';
import { DashboardPendingOfferRequestsComponent } from '@scaleo/dashboard/shared/widgets/pending-records/offer-request/component';
import { ManagerPostbackCreateComponent } from '@scaleo/feature/manager/affiliate/postback/upsert/modal-form';
import { MANAGER_OFFER_REQUEST_SOLVE_PROVIDER } from '@scaleo/feature/manager/offer/request/solve/data-access';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService, UiTabChangeTabEventModel } from '@scaleo/ui-kit/elements';

const LINK_PAGE = {
    affiliate: DASHBOARD_PENDING_RECORDS_INNER_WIDGET.affiliates,
    advertiser: DASHBOARD_PENDING_RECORDS_INNER_WIDGET.advertisers
} as const;

type LinPageUnionType = typeof LINK_PAGE[keyof typeof LINK_PAGE];

const LINK_PAGE_MAP: {
    [K in LinPageUnionType]: string;
} = {
    [LINK_PAGE.affiliate]: '/affiliates/pending',
    [LINK_PAGE.advertiser]: '/advertisers/pending'
};

interface InnerWidget {
    bodyTemplate: TemplateRef<any>;
    count$: Observable<number>;
    labelName: string;
    name: string;
}

@DynamicComponentLookup(DASHBOARD_WIDGET.pendingRecords)
@Component({
    selector: 'scaleo-manager-dashboard-pending-record-widget',
    templateUrl: './manager-dashboard-pending-record-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MANAGER_OFFER_REQUEST_SOLVE_PROVIDER]
})
export class ManagerDashboardPendingRecordWidgetComponent extends BaseDashboardWidgetComponent implements OnInit, AfterViewInit {
    readonly countsAffiliate$ = this.platformCountsService.counts$.pipe(pluck('affiliates', 'pending'));

    readonly countsAdvertiser$ = this.platformCountsService.counts$.pipe(pluck('advertisers', 'pending'));

    // TODO for now this functional is disabled
    // readonly countsAffiliatePostback$ = this.platformCountsService.counts$.pipe(pluck('affiliates', 'pending-postbacks'));

    readonly countsOfferRequest$ = this.platformCountsService.counts$.pipe(pluck('offers', 'pending-requests'));

    private link: string;

    showFooter = true;

    innerWidgets$: Observable<InnerWidget[]> = of([]);

    @ViewChild(DashboardPendingOfferRequestsComponent)
    readonly dashboardPendingOfferRequestsComponent: DashboardPendingOfferRequestsComponent;

    @ViewChild(DashboardPendingAffiliatePostbacksComponent)
    readonly dashboardPendingAffiliatePostbacksComponent: DashboardPendingAffiliatePostbacksComponent;

    @ViewChild('pendingAffiliateBodyTpl', { static: true, read: TemplateRef })
    private _pendingAffiliateBody: TemplateRef<any>;

    @ViewChild('pendingAdvertiserBodyTpl', { static: true, read: TemplateRef })
    private _pendingAdvertiserBody: TemplateRef<any>;

    @ViewChild('pendingOfferBodyTpl', { static: true, read: TemplateRef })
    private _pendingOfferBody: TemplateRef<any>;

    // TODO for now this functional is disabled
    // @ViewChild('pendingPostbackBodyTpl', { static: true, read: TemplateRef })
    // private _pendingPostbackBody: TemplateRef<any>;

    constructor(
        protected override readonly dashboardConfigService: DashboardConfigService,
        protected override readonly dashboardWidgetService: DashboardWidgetService,
        private readonly platformCountsService: PlatformCountsService,
        private readonly cdr: ChangeDetectorRef,
        private readonly modal3Service: Modal3Service,
        private readonly translate: TranslateService,
        private readonly toastr: ToastrBarService,
        private readonly navigateRootService: NavigateRootService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(dashboardConfigService, dashboardWidgetService, null);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.innerWidgets$ = of(this.widget.settings?.list).pipe(
            map((widgets) => {
                const { affiliates, offerRequests, advertisers } = DASHBOARD_PENDING_RECORDS_INNER_WIDGET;
                const innerWidgetsMap: BaseObjectModel<string, InnerWidget> = {
                    [affiliates]: {
                        bodyTemplate: this._pendingAffiliateBody,
                        labelName: 'main_navigation.affiliates',
                        count$: this.countsAffiliate$,
                        name: LINK_PAGE.affiliate
                    },
                    [advertisers]: {
                        bodyTemplate: this._pendingAdvertiserBody,
                        labelName: 'main_navigation.advertisers',
                        count$: this.countsAdvertiser$,
                        name: LINK_PAGE.advertiser
                    },
                    [offerRequests]: {
                        bodyTemplate: this._pendingOfferBody,
                        labelName: 'offers_requests_page.title',
                        count$: this.countsOfferRequest$,
                        name: undefined
                    }
                    // TODO for now this functional is disabled
                    // [affiliatePostbacks]: {
                    //     bodyTemplate: this._pendingPostbackBody,
                    //     labelName: 'dashboard_page.affiliate_postbacks',
                    //     count$: this.countsAffiliatePostback$,
                    //     name: undefined
                    // }
                };

                return widgets
                    ?.filter((elem) => elem.key !== DASHBOARD_PENDING_RECORDS_INNER_WIDGET.affiliatePostbacks)
                    .map((elem) => {
                        return innerWidgetsMap?.[elem.key];
                    });
            }),
            tap(([firstTab]) => {
                if (firstTab?.name) {
                    this.prepareLink(firstTab?.name as LinPageUnionType);
                }
            })
        );
    }

    ngAfterViewInit(): void {
        this.createWidgetAction()
            .pipe(
                tap((action) => {
                    this.dashboardWidgetService.activeInactiveWidget(action, this.widget);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();

        this.setContainerWidgetFooterBorderTop();
    }

    changeTab({ name }: UiTabChangeTabEventModel): void {
        this.prepareLink(name as LinPageUnionType);
    }

    navigate() {
        if (this.link) {
            this.navigateRootService.navigate(this.link);
        }
    }

    openModal(editId: number, affiliateId: number) {
        const modal$ = this.modal3Service.editForm(ManagerPostbackCreateComponent, {
            data: {
                editId,
                affiliateId
            }
        });

        modal$.afterClosed$.pipe(filter(({ type }) => type === Modal3CloseEventEnum.Update)).subscribe(() => {
            this.toastr.successes(this.translate.instant('affiliate.postback.edited_affiliate'));
            this.reload();
        });

        modal$.afterClosed$.pipe(filter(({ type }) => type === Modal3CloseEventEnum.Delete)).subscribe(() => {
            this.toastr.successes(this.translate.instant('affiliate.postback.deleted'));
            this.reload();
        });
    }

    changedOfferRequest(): void {
        this.dashboardPendingOfferRequestsComponent.reload();
        this.platformCountsService.update();
    }

    private reload(): void {
        this.dashboardPendingAffiliatePostbacksComponent.reload();
        this.platformCountsService.update();
    }

    private prepareLink(tabName: LinPageUnionType): void {
        this.link = undefined;
        this.showFooter = false;
        if (tabName) {
            const link = LINK_PAGE_MAP?.[tabName];
            this.link = link ? link : undefined;
            this.showFooter = !!link;
            this.cdr.markForCheck();
        }
    }
}
