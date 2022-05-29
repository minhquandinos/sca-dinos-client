import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, pluck, take } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    REPORT_ADJUSTMENT_LIST_PROVIDER,
    ReportAdjustmentListQuery,
    ReportAdjustmentListService
} from '@scaleo/feature/manager/reports/transactions/adjustment/list/data-access';
import { ManagerAdjustmentUpsertComponent } from '@scaleo/feature/manager/reports/transactions/adjustment/upsert/modal-form';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { AdjustmentsStatusesNameEnum } from '@scaleo/platform/list/access-data';
import { REPORTS_LAYOUT, ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-adjusment-list',
    templateUrl: './adjustments.component.html',
    providers: [
        {
            provide: REPORTS_LAYOUT,
            useExisting: ReportsLayoutComponent
        },
        REPORT_ADJUSTMENT_LIST_PROVIDER,
        UnsubscribeService
    ]
})
export class AdjustmentsComponent implements OnInit, AfterViewInit {
    items$ = this.reportAdjustmentListQuery.selectAll();

    loading$ = this.reportAdjustmentListQuery.selectLoading();

    pagination$ = this.reportAdjustmentListQuery.selectDataValue$('pagination');

    totalCount$ = this.pagination$.pipe(pluck('total_count'));

    showPagination$ = this.totalCount$.pipe(map((total) => total > 9));

    defaultRangeFrom$ = this.reportAdjustmentListQuery.selectParamsValue$('rangeFrom');

    defaultRangeTo$ = this.reportAdjustmentListQuery.selectParamsValue$('rangeTo');

    // 'added_timestamp', 'status', 'action_id', 'parameters', 'conditions', 'notes', 'affected'
    tableHeaders: UiTable2ColumnsModel[] = [
        {
            value: 'added_timestamp',
            translate: 'table.column.added_timestamp'
        },
        {
            value: 'status',
            translate: 'table.column.status'
        },
        {
            value: 'action_id',
            translate: 'table.column.action_id'
        },
        {
            value: 'parameters',
            translate: 'table.column.parameters'
        },
        {
            value: 'conditions',
            translate: 'table.column.conditions'
        },
        {
            value: 'notes',
            translate: 'table.column.notes'
        },
        {
            value: 'affected',
            translate: 'table.column.affected'
        }
    ];

    @ViewChild('layoutHeaderTpl', { static: true })
    layoutHeaderTpl: TemplateRef<any>;

    filterForm: FormGroup;

    constructor(
        private customDateRangeService: CustomDateRangeService,
        public modal3Service: Modal3Service,
        private reportAdjustmentListService: ReportAdjustmentListService,
        private reportAdjustmentListQuery: ReportAdjustmentListQuery,
        @Inject(REPORTS_LAYOUT) private reportsLayout: ReportsLayoutComponent,
        private readonly unsubscribe: UnsubscribeService,
        private readonly fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initFilterForm();
        this.loadItems();
    }

    ngAfterViewInit(): void {
        this.reportsLayout.createHeader(this.layoutHeaderTpl);
    }

    dateWasChange({ rangeFrom, rangeTo }: CustomDateRangeModel): void {
        this.reportAdjustmentListService.updateParamsValue({
            rangeFrom,
            rangeTo
        });
    }

    openModal(editId?: number): void {
        const modal$ = this.modal3Service.editForm(ManagerAdjustmentUpsertComponent, {
            data: {
                editId: editId || null
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => [Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Delete].includes(type as Modal3CloseEventEnum)),
                take(1)
            )
            .subscribe(() => {
                this.reportAdjustmentListService.reload();
            });
    }

    pageWasChanged(page: number): void {
        this.reportAdjustmentListService.updateParamsValue({ page });
    }

    perPageWasChange(perPage: number): void {
        this.reportAdjustmentListService.updateParamsValue({ perPage, page: 1 });
    }

    searching(search: string): void {
        this.reportAdjustmentListService.updateParamsValue({ search, page: 1 });
    }

    statusChange({ newValue }: SelectChangeModel<AdjustmentsStatusesNameEnum>): void {
        this.reportAdjustmentListService.updateParamsValue({ status: newValue });
    }

    private loadItems(): void {
        this.reportAdjustmentListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    private initFilterForm(): void {
        this.filterForm = this.fb.group({
            status: [this.reportAdjustmentListQuery.getParams()?.status]
        });
    }
}
