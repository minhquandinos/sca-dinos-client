import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { map, pluck, takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_REPORT_REFERRAL_LIST_PROVIDER,
    ManagerReportReferralListQuery,
    ManagerReportReferralListService
} from '@scaleo/feature/manager/reports/statistics/referrals/data-access';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { ReportReferralListTableConfigModel } from '@scaleo/reports/referrals/list';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-report-referral-list',
    templateUrl: './manager-report-referral-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MANAGER_REPORT_REFERRAL_LIST_PROVIDER, UnsubscribeService]
})
export class ManagerReportReferralListComponent implements OnInit {
    items$ = this.managerReportReferralListQuery.selectAll();

    loading$ = this.managerReportReferralListQuery.selectLoading();

    pagination$ = this.managerReportReferralListQuery.selectDataValue$('pagination');

    filters$ = this.managerReportReferralListQuery.selectPayloadValue$('filters');

    totalCount$ = this.pagination$.pipe(pluck('total_count'));

    tableConfig: ReportReferralListTableConfigModel;

    initialDateRange$ = this.managerReportReferralListQuery.selectPayload$().pipe(
        map(({ rangeFrom, rangeTo }) => {
            return {
                rangeFrom,
                rangeTo
            };
        })
    );

    referralCommissionsTypeEnum = ReferralCommissionsTypeEnum;

    readonly showBaseAmountField: boolean =
        this.platformReferralSettingsService.referralCommissionsType !== ReferralCommissionsTypeEnum.Flat;

    readonly referralCommissionCurrency: string = this.referralTypeIsNotFlat
        ? null
        : this.platformReferralSettingsService?.referralCommissionCurrency;

    referralCommissionsType: ReferralCommissionsTypeEnum = this.platformReferralSettingsService.referralCommissionsType;

    @ViewChild('affiliateRowTpl', { static: true })
    private readonly _affiliateRowTpl: TemplateRef<any>;

    @ViewChild('referredAffiliateTpl', { static: true })
    private readonly _referredAffiliateTpl: TemplateRef<any>;

    @ViewChild('referredRateTpl', { static: true })
    private readonly _referredRateTpl: TemplateRef<any>;

    @ViewChild('baseAmountTpl', { static: true })
    private readonly _baseAmountTpl: TemplateRef<any>;

    @ViewChild('referralCommissionTpl', { static: true })
    private readonly _referralCommissionTpl: TemplateRef<any>;

    constructor(
        private readonly platformReferralSettingsService: PlatformReferralSettingsService,
        private readonly managerReportReferralListService: ManagerReportReferralListService,
        private readonly managerReportReferralListQuery: ManagerReportReferralListQuery,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private readonly checkPermissionService: CheckPermissionService
    ) {}

    ngOnInit(): void {
        this.managerReportReferralListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
        this.tableConfig = {
            headers: this.tableHeaders,
            rowsTemplate: new Map([
                ['affiliate', this._affiliateRowTpl],
                ['referred_affiliate', this._referredAffiliateTpl],
                ['rate', this._referredRateTpl],
                ['base_amount', this._baseAmountTpl],
                ['referral_commission', this._referralCommissionTpl]
            ])
        };
    }

    pageWasChanged(page: number): void {
        this.managerReportReferralListService.updateParamsValue({ page });
    }

    perPageWasChanged(perPage: number): void {
        this.managerReportReferralListService.updateParamsValue({ perPage, page: 1 });
    }

    updateFilters(filters: any): void {
        this.managerReportReferralListService.updatePayloadValue({
            filters
        });
    }

    dateWasChanged({ rangeFrom, rangeTo }: CustomDateRangeModel): void {
        this.managerReportReferralListService.updatePayloadValue({
            rangeFrom,
            rangeTo
        });
    }

    reload() {
        this.managerReportReferralListService.reload();
    }

    private additionalHeaderFilterByRole(header: UiTable2ColumnsModel): boolean {
        if (header.value === 'base_amount') {
            return this.referralTypeIsNotFlat && this.checkPermissionService.check(this.permissions.frontCanSeeReferralReportBaseAmount);
        }

        if (header.value === 'rate') {
            return this.referralTypeIsNotFlat;
        }

        return true;
    }

    private get referralTypeIsNotFlat(): boolean {
        return this.platformReferralSettingsService.referralCommissionsType !== ReferralCommissionsTypeEnum.Flat;
    }

    private get tableHeaders(): UiTable2ColumnsModel[] {
        const headers: UiTable2ColumnsModel[] = [
            {
                translate: 'table.column.affiliate',
                value: 'affiliate'
            },
            {
                translate: 'table.column.referral',
                value: 'referred_affiliate'
            },
            {
                translate: 'table.column.rate',
                value: 'rate'
            },
            {
                translate: 'table.column.base_amount',
                value: 'base_amount',
                align: 'right'
            },
            {
                translate: 'referrals_page.form.referral_commission',
                value: 'referral_commission',
                align: 'right'
            }
        ];

        return headers.filter((header) => this.additionalHeaderFilterByRole(header));
    }
}
