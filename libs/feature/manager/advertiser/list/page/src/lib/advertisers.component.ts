import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { first, take, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AuthAsService } from '@scaleo/auth/as/service';
import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    ADVERTISER_LIST_PROVIDER,
    AdvertiserListModel,
    AdvertiserListQuery,
    AdvertiserListService
} from '@scaleo/feature/manager/advertiser/list/data-access';
import { AdvertiserCreateComponent } from '@scaleo/feature/manager/advertiser/upsert/component';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { NavigateRootService } from '@scaleo/shared/components';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import {
    StatusesId,
    ToastrBarService,
    UiTable2ColumnDirectionType,
    UiTable2ColumnsModel,
    UiTableSortInterface
} from '@scaleo/ui-kit/elements';

import { advertisersColumns } from './advertisers-columns.config';

@Component({
    selector: 'scaleo-mng-advertiser-list',
    templateUrl: './advertisers.component.html',
    styleUrls: ['./advertisers.component.css'],
    providers: [ADVERTISER_LIST_PROVIDER, UnsubscribeService] // QuickLinksService
})
export class AdvertisersComponent implements OnInit {
    readonly tableHeaders: UiTable2ColumnsModel[] = advertisersColumns;

    public items$: Observable<AdvertiserListModel[]> = this.advertisersQuery.selectAll();

    public pagination$ = this.advertisersQuery.pagination$;

    public params$ = this.advertisersQuery.selectParams$();

    public loading$ = this.advertisersQuery.selectLoading();

    readonly pathPage: string;

    readonly sortField$: Observable<string> = this.advertisersQuery.selectParamsValue$('sortField');

    readonly sortDirection$: Observable<UiTable2ColumnDirectionType> = this.advertisersQuery.selectParamsValue$('sortDirection');

    public readonly statusId = StatusesId;

    @ViewChild('pageWrapperHeader', { static: true }) pageWrapperHeader: ElementRef;

    @ViewChild('filterWrapperHeader', { static: true }) filterWrapperHeader: ElementRef;

    @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef;

    @ViewChild('tableHead', { static: true }) tableHead: ElementRef;

    @ViewChildren('tableElement') private tableElement: QueryList<ElementRef>;

    constructor(
        public shared: SharedMethodsService,
        private platformCountsService: PlatformCountsService,
        private route: ActivatedRoute,
        private readonly router: Router,
        private authAsService: AuthAsService,
        private advertiserListService: AdvertiserListService,
        private advertisersQuery: AdvertiserListQuery,
        private toastr: ToastrBarService,
        private profile: ProfileQuery,
        private readonly modal3Service: Modal3Service,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private readonly navigateRootService: NavigateRootService
    ) {
        this.pathPage = this.route?.snapshot.parent.routeConfig.path;
    }

    ngOnInit(): void {
        this.pathFilter();
        this.loadItems();
        this.checkUrl();
    }

    public openModal(editId?: number): void {
        const modal$ = this.modal3Service.editForm(AdvertiserCreateComponent, {
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
                this.advertiserListService.reload();
            });
    }

    public pageWasChanged(page: number): void {
        this.advertiserListService.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                page: 1
            },
            queryParamsHandling: 'merge'
        });
        this.advertiserListService.updateParamsValue({ perPage, page: 1 });
    }

    loadItems(): void {
        this.advertiserListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    toLink(to: 'statistics' | 'conversions' | 'clicks', id: number): void {
        const urlMap: BaseObjectModel = {
            statistics: '/reports/statistics/day',
            conversions: '/transactions/conversions',
            clicks: '/transactions/clicks'
        };

        const url = urlMap[to];

        if (url) {
            this.navigateRootService.navigate(url, {
                [ReportFilterFilterEnum.Advertiser]: id
            });
        }
    }

    loginAs(email: string): void {
        this.authAsService.login(email);
    }

    private checkUrl(): void {
        this.shared
            .checkQueryParams('create')
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((res: boolean) => {
                if (res) {
                    this.openModal();
                }
            });
    }

    private pathFilter(): void {
        this.advertiserListService.updateParamsValue({
            onlyMine: this.pathPage === 'my' ? 'yes' : '',
            status: this.pathPage === 'pending' ? 'pending' : ''
        });
    }

    export(format: SheetExtensionType): void {
        this.advertiserListService.export(format).pipe(first()).subscribe();
    }

    searching(search: string): void {
        this.advertiserListService.updateParamsValue({ search, page: 1 });
    }

    sortingColumn(sort: UiTableSortInterface): void {
        this.advertiserListService.updateParamsValue({
            sortField: sort.field,
            sortDirection: sort.direction,
            page: 1
        });
    }
}
