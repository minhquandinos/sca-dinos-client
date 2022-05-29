import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, pluck, share, take, takeUntil } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_SMART_LINK_LIST_PROVIDER,
    ManagerOfferSmartLinkListModel,
    ManagerSmartLinkListQuery,
    ManagerSmartLinkListService
} from '@scaleo/feature/manager/offer/smart-link/list/data-access';
import { SmartLinkCreateComponent } from '@scaleo/feature/manager/offer/smart-link/upsert/modal-form';
import { OFFERS_LAYOUT, OffersLayoutComponent, OffersLayoutContainersEnum } from '@scaleo/offer/layouts/list';
import {
    TargetingLinkBuilderEnum,
    TargetingLinkBuilderInputDataModel,
    TargetingLinkBuilderSmartLinkConfigModel
} from '@scaleo/offer/link-builder/common';
import { SmartLinkLinkBuilderComponent } from '@scaleo/offer/link-builder/smart-link';
import { SmartLinkStatusesEnum } from '@scaleo/offer/smart-link/common';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { NavigateRootService } from '@scaleo/shared/components';
import { PageTitleService } from '@scaleo/shared/services/page-title';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-smart-links',
    templateUrl: './smart-links.component.html',
    providers: [
        UnsubscribeService,
        {
            provide: OFFERS_LAYOUT,
            useExisting: OffersLayoutComponent
        },
        MANAGER_SMART_LINK_LIST_PROVIDER
    ]
})
export class SmartLinksComponent implements OnInit, AfterViewInit {
    readonly items$: Observable<ManagerOfferSmartLinkListModel[]> = this.query.selectAll();

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    readonly loading$ = this.query.selectLoading();

    readonly params$ = this.query.selectParams$();

    readonly tableHeaders: UiTable2ColumnsModel[] = [
        {
            value: 'smart_link',
            translate: 'smart_link_page.title',
            colWidth: '30%'
        },
        {
            value: 'offers',
            translate: 'table.column.offers',
            colWidth: '30%'
        },
        {
            value: 'traffic_distribution',
            translate: 'smart_link_page.form.traffic_distribution',
            colWidth: '20%'
        },
        {
            value: 'tracking_domain',
            translate: 'table.column.tracking_domain',
            colWidth: '20%'
        }
    ];

    readonly smartLinkStatus = SmartLinkStatusesEnum;

    @ViewChild('filterContainer', { static: true })
    private readonly filterContainer: TemplateRef<HTMLElement>;

    @ViewChild('footerContainer', { static: true })
    private readonly footerContainer: TemplateRef<HTMLElement>;

    @ViewChild('openModalContainer', { static: true })
    private readonly openModalContainer: TemplateRef<HTMLElement>;

    readonly fakeRows = this.sharedMethods.generateFake(4);

    showPagination$ = combineLatest([this.loading$, this.totalCount$]).pipe(
        map(([loading, total]) => !loading && total > 9),
        share()
    );

    constructor(
        private readonly service: ManagerSmartLinkListService,
        private readonly query: ManagerSmartLinkListQuery,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(OFFERS_LAYOUT) private readonly offersLayoutComponent: OffersLayoutComponent,
        private readonly headerService: PageTitleService,
        private readonly route: ActivatedRoute,
        private readonly sharedMethods: SharedMethodsService,
        private readonly modal3: Modal3Service,
        private readonly router: Router,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private readonly navigateRootService: NavigateRootService
    ) {}

    ngOnInit(): void {
        this.loadItems();
    }

    ngAfterViewInit(): void {
        this.offersLayoutComponent.createContainer(this.filterContainer, OffersLayoutContainersEnum.Filter);
        this.offersLayoutComponent.createContainer(this.footerContainer, OffersLayoutContainersEnum.Footer);
        this.offersLayoutComponent.createContainer(this.openModalContainer, OffersLayoutContainersEnum.OpenModal);

        // if (!this.planPermissions.allowSmartLink) {
        //     this.offersLayoutComponent.createContainer(this.upgradeContainer, OffersLayoutContainersEnum.Upgrade);
        // }
    }

    public createSmartLink(id?: number) {
        const modal = this.modal3.editForm(SmartLinkCreateComponent, {
            data: {
                editId: id || null
            }
        });

        modal.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.service.reload();
            });
    }

    getLink(id: number, trackingDomain: string) {
        const config: TargetingLinkBuilderSmartLinkConfigModel = {
            type: TargetingLinkBuilderEnum.SmartLink,
            id
        };

        const data: TargetingLinkBuilderInputDataModel = {
            trackingDomain,
            config
        };

        this.modal3.editForm<any, TargetingLinkBuilderInputDataModel>(SmartLinkLinkBuilderComponent, {
            data
        });
    }

    public pageWasChanged(page: number): void {
        this.service.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number) {
        this.service.updateParamsValue({ perPage, page: 1 });
    }

    private loadItems(): void {
        this.service.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    public toLink(to: 'statistics' | 'conversions' | 'clicks', id: number) {
        const urlMap: BaseObjectModel = {
            statistics: '/reports/statistics/day',
            conversions: '/transactions/conversions',
            clicks: '/transactions/clicks'
        };

        const url = urlMap?.[to] ? this.navigateRootService.path(urlMap[to]) : undefined;

        if (url) {
            this.router.navigate([url], {
                queryParams: {
                    [ReportFilterFilterEnum.SmartLinks]: id
                }
            });
        }
    }

    trackBySkeletonFn(index: number): number {
        return index;
    }
}
