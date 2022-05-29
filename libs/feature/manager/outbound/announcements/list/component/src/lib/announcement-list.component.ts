import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, filter, Observable, take } from 'rxjs';
import { map, share, takeUntil } from 'rxjs/operators';

import { StatusType } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AnnouncementListQuery,
    AnnouncementListService,
    MANAGER_ANNOUNCEMENT_LIST_PROVIDER
} from '@scaleo/feature/manager/outbound/announcements/list/data-access';
import { AnnouncementsEditComponent } from '@scaleo/feature/manager/outbound/announcements/upsert/modal-form';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-announcements',
    templateUrl: './announcement-list.component.html',
    providers: [MANAGER_ANNOUNCEMENT_LIST_PROVIDER, UnsubscribeService]
})
export class AnnouncementListComponent implements OnInit {
    readonly items$ = this.announcementListQuery.selectAll();

    readonly totalCount$: Observable<number> = this.announcementListQuery.totalCount$;

    readonly loading$ = this.announcementListQuery.selectLoading();

    readonly pagination$ = this.announcementListQuery.selectDataValue$('pagination');

    readonly showPagination$ = combineLatest([this.loading$, this.totalCount$]).pipe(
        map(([loading, total]) => !loading && total > 9),
        share()
    );

    filterForm: FormGroup;

    columns: UiTable2ColumnsModel[] = [
        {
            value: 'title',
            translate: 'table.column.title',
            colWidth: '35%',
            textAlign: 'left'
        },
        {
            value: 'connected_offers',
            translate: 'outbound_page.announcements.basic.connected_offers',
            colWidth: '25%',
            textAlign: 'left'
        },
        {
            value: 'visible_for',
            translate: 'outbound_page.announcements.basic.visible_for',
            colWidth: '10%',
            textAlign: 'left'
        },
        {
            value: 'author',
            translate: 'outbound_page.announcements.basic.author',
            colWidth: '18%',
            textAlign: 'left'
        }
        // {
        //     value: 'emails_sent',
        //     key: 'emails_sent',
        //     translateKey: 'outbound_page.announcements.basic.emails_sent',
        //     colWidth: '12',
        //     textAlign: 'left'
        // }
    ];

    constructor(
        private readonly unsubscribe: UnsubscribeService,
        private readonly announcementListService: AnnouncementListService,
        private readonly announcementListQuery: AnnouncementListQuery,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private readonly modal3: Modal3Service,
        private readonly fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initFilterForm();
        this.loadItems();
    }

    public pageWasChanged(page: number): void {
        this.announcementListService.updateParamsValue({ page });
    }

    public perPageWasChange(perPage: number): void {
        this.announcementListService.updateParamsValue({ perPage, page: 1 });
    }

    public searching(search: string): void {
        this.announcementListService.updateParamsValue({ search, page: 1 });
    }

    public setFilterStatus(status: StatusType): void {
        this.announcementListService.updateParamsValue({ status });
    }

    private loadItems(): void {
        this.announcementListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    public showEmailsSent(template: TemplateRef<HTMLElement>): void {
        this.modal3.info(template, {});
    }

    public openModal(id?: number): void {
        this.modal3
            .editForm(AnnouncementsEditComponent, {
                data: {
                    editId: id || null
                }
            })
            .afterClosed$.pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1)
            )
            .subscribe(() => {
                this.announcementListService.reload();
            });
    }

    private initFilterForm(): void {
        this.filterForm = this.fb.group({
            status: ['']
        });
    }
}
