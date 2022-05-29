import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { filter, Observable, take } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { RECEIVE_LEADS_LAYOUT, ReceiveLeadsLayoutComponent } from '@scaleo/feature/manager/leads/layouts';
import {
    LeadsReceiveCampaignList,
    RECEIVE_LEADS_CAMPAIGN_LIST_PROVIDER,
    ReceiveLeadsCampaignListQuery,
    ReceiveLeadsCampaignListService
} from '@scaleo/feature-manager-leads-receive-campaigns-list-data-access';
import { CampaignCreateComponent } from '@scaleo/feature-manager-leads-receive-campaigns-upsert-form-modal';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

import { campaignTableColumns } from './configs/campaign-table-columns.config';

@Component({
    selector: 'scaleo-manager-leads-receive-campaign-list',
    templateUrl: './manager-leads-receive-list-component.component.html',
    providers: [
        UnsubscribeService,
        RECEIVE_LEADS_CAMPAIGN_LIST_PROVIDER,
        {
            provide: RECEIVE_LEADS_LAYOUT,
            useExisting: ReceiveLeadsLayoutComponent
        }
    ]
})
export class ManagerLeadsReceiveListComponentComponent implements OnInit {
    readonly tableHeaders: UiTable2ColumnsModel[] = campaignTableColumns;

    readonly items$: Observable<LeadsReceiveCampaignList[]> = this.query.selectAll();

    readonly pagination$ = this.query.selectDataValue$('pagination');

    readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    readonly loading$ = this.query.selectLoading();

    readonly params$ = this.query.selectParams$();

    @ViewChild('createTemplate', { static: true })
    private readonly _createTemplate: TemplateRef<any>;

    @ViewChild('footerTemplate', { static: true })
    private readonly _footerTemplate: TemplateRef<any>;

    @ViewChild('filterTemplate', { static: true })
    private readonly _filterTemplate: TemplateRef<any>;

    constructor(
        private readonly service: ReceiveLeadsCampaignListService,
        private readonly query: ReceiveLeadsCampaignListQuery,
        // private readonly campaignCreateService: LeadsReceiveCampaignUpsertService,
        private readonly modal3Service: Modal3Service,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(RECEIVE_LEADS_LAYOUT) private readonly layout: ReceiveLeadsLayoutComponent,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.loadItems();

        if (this.layout) {
            this.layout.setControlPortal(this._createTemplate);
            this.layout.setFooterPortal(this._footerTemplate);
            this.layout.setFilterPortal(this._filterTemplate);
        }
    }

    pageWasChanged(page: number): void {
        this.service.updateParamsValue({
            page
        });
    }

    perPageWasChange(perPage: number): void {
        this.service.updateParamsValue({
            perPage
        });
    }

    private loadItems(): void {
        this.service.list().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    upsert(id?: number) {
        const ref$ = this.modal3Service.editForm(CampaignCreateComponent, {
            data: {
                editId: id || null
            }
        }).afterClosed$;

        ref$.pipe(
            filter(({ type }) =>
                [Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete].includes(
                    type as Modal3CloseEventEnum
                )
            ),
            take(1)
        ).subscribe(() => {
            this.service.reload();
        });
    }
}
