import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, throwError } from 'rxjs';
import { catchError, debounceTime, filter, switchMap, take } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import {
    MANAGER_CONVERSION_CHANGE_STATUS_PROVIDER,
    ManagerConversionsChangeStatusPayloadParamsModel,
    ManagerConversionsChangeStatusService
} from '@scaleo/feature/manager/reports/transactions/conversion/change-status/data-access';
import {
    CONVERSION_STATUSES_TRANSLATE,
    PlatformConversionStatusNameValueType,
    PlatformConversionStatusValueType,
    PlatformListsService,
    PlatformListStatusModel
} from '@scaleo/platform/list/access-data';
import { ReportsService } from '@scaleo/reports/state';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { DropDownMenuInterface, ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

// TODO refactor this
@Component({
    selector: 'app-conversions-change-status',
    template: `
        <ui-old-dropdown-menu
            icon="down-white"
            dropMenuPosition="right"
            buttonType="main-floating"
            [label]="'interface.basic.change_status' | translate"
            [elements]="changeStatusElements$ | async"
            className="report-conversions__dropdown-menu"
        ></ui-old-dropdown-menu>

        <ng-template #confirmChangeStatusTpl>
            <div class="text-pre-wrap">{{ 'reports_page.conversions.confirm.confirm_text' | translate }}</div>

            <div class="mt-3">
                <app-custom-checkbox
                    [label]="'reports_page.conversions.confirm.checkbox_label' | translate"
                    [(ngModel)]="firePostbacksValue"
                ></app-custom-checkbox>
            </div>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MANAGER_CONVERSION_CHANGE_STATUS_PROVIDER]
})
export class ManagerConversionsChangeStatusComponent {
    @Input() selectedItems: string[];

    firePostbacksValue: BooleanEnum = BooleanEnum.True;

    status: any;

    readonly changeStatusElements$: Observable<DropDownMenuInterface[]> = this.platformListsService
        .platformListsNew('conversion_statuses')
        .pipe(
            map(({ conversion_statuses }) => {
                return conversion_statuses.map((status: PlatformListStatusModel) => {
                    const translate = CONVERSION_STATUSES_TRANSLATE;
                    return {
                        title: translate?.[status.status as PlatformConversionStatusNameValueType],
                        action: () => this.changeStatus(status.id as PlatformConversionStatusValueType)
                    };
                });
            })
        );

    @Output() statusWasChanged: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('confirmChangeStatusTpl')
    private readonly confirmChangeStatusTpl: TemplateRef<ElementRef>;

    constructor(
        private readonly reportsService: ReportsService,
        private readonly translate: TranslateService,
        private readonly managerConversionsChangeStatusService: ManagerConversionsChangeStatusService,
        private readonly toastr: ToastrBarService,
        private readonly modal3Service: Modal3Service,
        private readonly platformListsService: PlatformListsService
    ) {}

    changeStatus(status: PlatformConversionStatusValueType): void {
        const transactions: string = ArrayUtil.join(this.selectedItems);
        const { rangeFrom, rangeTo } = this.reportsService.date;

        const payload: ManagerConversionsChangeStatusPayloadParamsModel = {
            rangeFrom,
            rangeTo,
            new_status: status,
            filters: {
                transactions
            }
        };

        const modal$ = this.modal3Service.confirm(this.confirmChangeStatusTpl, {
            title: this.translate.instant('reports_page.conversions.confirm.confirm_title'),
            typeButton: 'main',
            actionLabel: this.translate.instant('reports_page.conversions.confirm.action')
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                debounceTime(1000),
                switchMap(() => {
                    payload.fire_postbacks = this.firePostbacksValue;
                    return this.managerConversionsChangeStatusService.changeStatus(payload);
                }),
                catchError((error) => {
                    this.toastr.displayValidationMessages(error?.info?.errors);
                    return throwError(error);
                }),
                take(1)
            )
            .subscribe(() => {
                this.firePostbacksValue = BooleanEnum.True;
                this.toastr.response(ToastrBarEventEnum.Updated, 'statuses.status');
                this.statusWasChanged.emit();
            });
    }
}
