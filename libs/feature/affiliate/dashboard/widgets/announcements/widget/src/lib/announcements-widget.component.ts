import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, pluck, share, takeUntil, tap } from 'rxjs';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardWidgetService } from '@scaleo/dashboard/service';
import {
    AFFILIATE_DASHBOARD_ANNOUNCEMENT_PROVIDER,
    AnnouncementsType,
    AnnouncementsWidgetMenus,
    DashboardAnnouncementWidgetListService,
    DashboardAnnouncementWidgetMenuService
} from '@scaleo/feature/affiliate/dashboard/widgets/announcements/data-access';
import { AffiliateAnnouncementsViewModalComponent } from '@scaleo/feature/affiliate/dashboard/widgets/announcements/view-modal';
import { AnnouncementsListInterface } from '@scaleo/feature/manager/outbound/announcements/list/data-access';
import { PlatformCountsService } from '@scaleo/platform/counts/data-access';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@DynamicComponentLookup(DASHBOARD_WIDGET.announcements)
@Component({
    selector: 'scaleo-affiliate-announcements-widget',
    templateUrl: './announcements-widget.component.html',
    providers: [AFFILIATE_DASHBOARD_ANNOUNCEMENT_PROVIDER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnouncementsWidgetComponent extends BaseDashboardWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    public menus$: Observable<AnnouncementsWidgetMenus[]> = this.announcementWidgetMenuService.menus$;

    public activeMenu: AnnouncementsType = 'all';

    public items$: Observable<AnnouncementsListInterface[]>;

    public isLoad = false;

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        private platformCountsService: PlatformCountsService,
        private announcementWidgetListService: DashboardAnnouncementWidgetListService,
        public shared: SharedMethodsService,
        private modal3Service: Modal3Service,
        private announcementWidgetMenuService: DashboardAnnouncementWidgetMenuService
    ) {
        super(dashboardConfigService, dashboardWidgetService, null);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.announcementWidgetMenuService.filterMenus();
        this.loadCountList();
        this.loadItems();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    ngAfterViewInit(): void {
        this.setContainerWidgetFooterBorderTop();
    }

    private loadCountList(): void {
        this.announcementWidgetMenuService.loadCountList().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    private loadItems(): void {
        this.isLoad = false;
        this.items$ = this.announcementWidgetListService.index().pipe(
            pluck('results'),
            map((response: AnnouncementsListInterface[]) =>
                response.map((item: AnnouncementsListInterface) => ({
                    ...item,
                    count_connected_offers_selected: item.connected_offers_selected.length,
                    first_connected_offer_selected: item.connected_offers_selected.length > 0 ? item.connected_offers_selected[0] : null
                }))
            ),
            tap(() => {
                this.isLoad = true;
            }),
            share()
        );
    }

    public openModal(id: number = null): void {
        this.modal3Service.editForm(AffiliateAnnouncementsViewModalComponent, {
            wrapperClassName: 'announcements-modal-form',
            contentClassName: 'p-0',
            data: {
                id
            }
        });
    }

    public changeType(type: AnnouncementsType): void {
        this.isLoad = false;
        this.announcementWidgetListService.changeType(type);
        this.activeMenu = type;
    }

    public trackByFn(index: number, item: AnnouncementsWidgetMenus): number | string {
        return (item as any)?.[item.title] || index;
    }
}
