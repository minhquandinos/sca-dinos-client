import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { filter, Observable, take } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { RECEIVE_LEADS_LAYOUT, ReceiveLeadsLayoutComponent } from '@scaleo/feature/manager/leads/layouts';
import {
    DeliveriesQuery,
    DeliveriesService,
    LEADS_DELIVERIES_PROVIDER,
    LeadsDeliveriesModel
} from '@scaleo/feature-manager-leads-deliver-deliveries-list-data-access';
import { LeadsDeliveriesUpsertComponent } from '@scaleo/feature-manager-leads-deliver-deliveries-upsert-modal-form';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

import { deliveryTableColumnsConfig } from './configs/delivery-table-columns.config';

@Component({
    selector: 'scaleo-manager-leads-deliveries',
    templateUrl: './deliveries.component.html',
    providers: [
        UnsubscribeService,
        LEADS_DELIVERIES_PROVIDER,
        {
            provide: RECEIVE_LEADS_LAYOUT,
            useExisting: ReceiveLeadsLayoutComponent
        }
    ]
})
export class DeliveriesComponent implements OnInit {
    public readonly tableHeaders: UiTable2ColumnsModel[] = deliveryTableColumnsConfig;

    public readonly items$: Observable<LeadsDeliveriesModel[]> = this.query.selectAll();

    public readonly pagination$ = this.query.selectDataValue$('pagination');

    public readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    public readonly loading$ = this.query.selectLoading();

    public readonly params$ = this.query.selectParams$();

    @ViewChild('createTemplate', { static: true })
    private readonly _createTemplate: TemplateRef<any>;

    @ViewChild('footerTemplate', { static: true })
    private readonly _footerTemplate: TemplateRef<any>;

    @ViewChild('filterTemplate', { static: true })
    private readonly _filterTemplate: TemplateRef<any>;

    constructor(
        private service: DeliveriesService,
        private query: DeliveriesQuery,
        private modal3Service: Modal3Service,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(RECEIVE_LEADS_LAYOUT) private readonly layout: ReceiveLeadsLayoutComponent
    ) {}

    public ngOnInit(): void {
        this.loadItems();

        if (this.layout) {
            this.layout.setControlPortal(this._createTemplate);
            this.layout.setFooterPortal(this._footerTemplate);
            this.layout.setFilterPortal(this._filterTemplate);
        }
    }

    upsert(id?: number): void {
        const ref$ = this.modal3Service.editForm(LeadsDeliveriesUpsertComponent, {
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

    loadItems(): void {
        this.service.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }
}
