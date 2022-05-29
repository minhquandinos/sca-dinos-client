import { DOCUMENT } from '@angular/common';
import {
    AfterContentChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Inject,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, takeUntil, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_DASHBOARD_ANNOUNCEMENT_PROVIDER,
    AffiliateDashboardAnnouncementWidgetListModel,
    AnnouncementsType,
    AnnouncementsWidgetMenus,
    DashboardAnnouncementWidgetListService,
    DashboardAnnouncementWidgetMenuService
} from '@scaleo/feature/affiliate/dashboard/widgets/announcements/data-access';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';

@Component({
    selector: 'scaleo-affiliate-announcements-widget-view-modal',
    templateUrl: './affiliate-announcements-view-modal.component.html',
    styleUrls: ['./affiliate-announcements-view-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [AFFILIATE_DASHBOARD_ANNOUNCEMENT_PROVIDER, UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateAnnouncementsViewModalComponent implements OnInit, AfterViewInit, AfterContentChecked {
    @Input() set id(id: number) {
        this._id = id;
    }

    private _id: number;

    public items$: Observable<ApiResponseWithPagination<AffiliateDashboardAnnouncementWidgetListModel[]>>;

    public isLoad = false;

    public menus$: Observable<AnnouncementsWidgetMenus[]> = this.announcementWidgetService.menus$;

    public activeMenu: AnnouncementsType = 'all';

    private announcementList: AffiliateDashboardAnnouncementWidgetListModel[] = [];

    private pageCount: number;

    constructor(
        private platformCountsService: PlatformCountsService,
        public shared: SharedMethodsService,
        public profileQuery: ProfileQuery,
        private announcementWidgetService: DashboardAnnouncementWidgetMenuService,
        private dashboardAnnouncementWidgetListService: DashboardAnnouncementWidgetListService,
        @Inject(DOCUMENT) private document: Document,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.announcementWidgetService.filterMenus();
        this.loadItems();
    }

    ngAfterViewInit(): void {
        this.announcementWidgetService.loadCountList().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterContentChecked(): void {
        if (this._id) {
            this.scrollTo(this._id);
        }
    }

    public changeTypeAnnouncements(type: AnnouncementsType) {
        this.isLoad = false;
        if (type !== this.activeMenu) {
            this.announcementList = [];
            this.dashboardAnnouncementWidgetListService.changeType(type);
            this.activeMenu = type;
        }
    }

    private loadItems() {
        this.isLoad = false;
        this.items$ = this.dashboardAnnouncementWidgetListService.index().pipe(
            map((response: ApiResponseWithPagination<AffiliateDashboardAnnouncementWidgetListModel>) => {
                response.results = [...this.announcementList, ...response.results];
                this.announcementList = response.results;
                this.pageCount = response.pagination.page_count;
                return response;
            }),
            tap(() => {
                this.isLoad = true;
            }),
            share()
        );
    }

    public onScroll() {
        const nextPage = this.dashboardAnnouncementWidgetListService.filters.page + 1;
        if (this.isLoad && nextPage <= this.pageCount) {
            this.pageWasChanged(nextPage);
        }
    }

    public pageWasChanged(page: number): void {
        this.dashboardAnnouncementWidgetListService.changePage(page);
    }

    public perPageWasChange(perPage: number) {
        this.dashboardAnnouncementWidgetListService.changePerPage(perPage);
    }

    public searching(search: string): void {
        this.dashboardAnnouncementWidgetListService.searching(search);
    }

    private scrollTo(id: number) {
        const modal = this.document.querySelector('.page-modal');
        const el = this.document.getElementById(String(id))?.offsetTop + 20;
        if (el) {
            modal.scroll({ top: el, behavior: 'smooth' });
            this._id = null;
        }
    }

    public trackByFn(index: number, item: AnnouncementsWidgetMenus) {
        return (item as any)?.[item.title];
    }
}
