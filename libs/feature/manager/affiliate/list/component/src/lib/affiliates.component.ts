import { Component, ElementRef, Inject, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, Observable, take, tap } from 'rxjs';
import { map, pluck, share, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AuthAsService } from '@scaleo/auth/as/service';
import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AFFILIATE_LIST_PROVIDER, AffiliateListQuery, AffiliateListService } from '@scaleo/feature/manager/affiliate/list/data-access';
import { AffiliateCreateComponent } from '@scaleo/feature/manager/affiliate/upsert/modal-form';
import { ShowGettingStartedService } from '@scaleo/feature/manager/getting-started/shared/service';
import { FEATURE_SHARED_COLLECTION_LAYOUT_TOKEN, FeatureSharedCollectionLayoutInterface } from '@scaleo/feature/shared/layouts/collection';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PlatformListsInterface, PlatformListsService } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { CustomPaginationUtil, NavigateRootService } from '@scaleo/shared/components';
import { GetFilterInterface } from '@scaleo/shared/services/filters';
import { PageTitleService } from '@scaleo/shared/services/page-title';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import {
    StatusesId,
    ToastrBarService,
    UiTable2ColumnDirectionType,
    UiTable2ColumnsModel,
    UiTableSortInterface
} from '@scaleo/ui-kit/elements';

import { MANAGER_AFFILIATE_LIST_COLUMNS_FACTORY, MANAGER_AFFILIATE_LIST_COLUMNS_TOKEN } from './config/affiliates-columns.config';

@Component({
    selector: 'scaleo-manager-affiliate-list',
    templateUrl: './affiliates.component.html',
    providers: [AFFILIATE_LIST_PROVIDER, UnsubscribeService, MANAGER_AFFILIATE_LIST_COLUMNS_FACTORY, ShowGettingStartedService]
})
export class AffiliatesComponent implements OnInit {
    readonly items$ = this.affiliateListQuery.selectAll();

    readonly pagination$ = this.affiliateListQuery.selectDataValue$('pagination');

    readonly params$ = this.affiliateListQuery.selectParams$();

    readonly loading$ = this.affiliateListQuery.loading$;

    readonly isLoad$ = this.affiliateListQuery.isLoad$;

    readonly sortField$: Observable<string> = this.affiliateListQuery.selectParamsValue$('sortField');

    readonly sortDirection$: Observable<UiTable2ColumnDirectionType> = this.affiliateListQuery.selectParamsValue$('sortDirection');

    public filterForm: FormGroup;

    public readonly statusesId = StatusesId;

    readonly pathPage: string;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.pagination$.pipe(pluck('total_count')));

    readonly showHint$ = this.showGettingStartedService.showHint(
        this.isLoad$,
        this.items$,
        this.permissions.canAddEditDeleteAffiliates,
        'gettingStartedAffiliate'
    );

    @ViewChild('openModalTpl', { static: true })
    private _openModalTpl: TemplateRef<any>;

    @ViewChild('hintTpl', { static: true })
    private _hintTpl: TemplateRef<any>;

    @ViewChild('footerTpl', { static: true })
    private _footerTpl: TemplateRef<any>;

    @ViewChild('filterTpl', { static: true })
    private _filterTpl: TemplateRef<any>;

    @ViewChildren('tableElement') private tableElement: QueryList<ElementRef>;

    constructor(
        private platformCountsService: PlatformCountsService,
        public modal3Service: Modal3Service,
        public shared: SharedMethodsService,
        private readonly router: Router,
        private route: ActivatedRoute,
        private platformListsService: PlatformListsService,
        private fomBuilder: FormBuilder,
        private authAsService: AuthAsService,
        private headerService: PageTitleService,
        private profileQuery: ProfileQuery,
        private affiliateListService: AffiliateListService,
        private affiliateListQuery: AffiliateListQuery,
        private toastr: ToastrBarService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly navigateRootService: NavigateRootService,
        private readonly showGettingStartedService: ShowGettingStartedService,
        @Inject(FEATURE_SHARED_COLLECTION_LAYOUT_TOKEN) private readonly layout: FeatureSharedCollectionLayoutInterface,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        @Inject(MANAGER_AFFILIATE_LIST_COLUMNS_TOKEN) public readonly columns: UiTable2ColumnsModel[]
    ) {
        this.pathPage = this.route.snapshot.routeConfig.path;
    }

    ngOnInit(): void {
        this.pathFilter();
        this.loadItems();
        this.autoUpsertModalForm();
        this.setLayout();
    }

    public openModal(editId?: number): void {
        const modal$ = this.modal3Service.editForm(AffiliateCreateComponent, {
            data: {
                editId: editId || null
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.platformCountsService.update();
                this.affiliateListService.reload();
            });
    }

    public pageWasChanged(page: number): void {
        this.affiliateListService.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                page: 1
            },
            queryParamsHandling: 'merge'
        });
        this.affiliateListService.updateParamsValue({ perPage, page: 1 });
    }

    public loadItems(): void {
        this.affiliateListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    private initPlatformList(): Observable<PlatformListsInterface> {
        return this.platformListsService.platformListsNew('statuses,affiliates_tags').pipe(share());
    }

    toLink(to: 'statistics' | 'conversions' | 'clicks', id: number): void {
        const urlMap: BaseObjectModel = {
            statistics: '/reports/statistics/day',
            conversions: '/transactions/conversions',
            clicks: '/transactions/clicks'
        };

        const url = urlMap?.[to];

        if (url) {
            this.navigateRootService.navigate(url, {
                [ReportFilterFilterEnum.Affiliate]: id
            });
        }
    }

    loginAs(email: string): void {
        this.authAsService.login(email);
    }

    trackByFn(index: number): number {
        return index;
    }

    export(format: SheetExtensionType): void {
        this.affiliateListService.export(format).pipe(take(1)).subscribe();
    }

    searching(search: string): void {
        this.affiliateListService.updateParamsValue({ search, page: 1 });
    }

    sortingColumn(sort: UiTableSortInterface): void {
        this.affiliateListService.updateParamsValue({
            sortField: sort.field,
            sortDirection: sort.direction,
            page: 1
        });
    }

    private pathFilter(): void {
        this.affiliateListService.updateParamsValue({
            onlyMine: this.pathPage === 'my' ? 'yes' : '',
            status: this.pathPage === 'pending' ? 'pending' : ''
        });
    }

    private get getDefaultFilter(): GetFilterInterface {
        const queryParamPage = this.route?.snapshot?.queryParams?.['page'];
        return {
            page: queryParamPage || 1,
            onlyMine: this.pathPage === 'my' ? 'yes' : null,
            status: this.pathPage === 'pending' ? 'pending' : 'status'
        };
    }

    private autoUpsertModalForm(): void {
        this.route.queryParams
            .pipe(
                map((url: Params) => {
                    return url['create'];
                }),
                filter((isCreate) => !!isCreate),
                tap(() => {
                    this.openModal();
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    private setLayout(): void {
        if (this.layout) {
            this.layout.setControlPortal(this._openModalTpl);
            this.layout.setFilterPortal(this._filterTpl);
            this.layout.setFooterPortal(this._footerTpl);
            this.layout.setHintPortal(this._hintTpl);
        }
    }
}
