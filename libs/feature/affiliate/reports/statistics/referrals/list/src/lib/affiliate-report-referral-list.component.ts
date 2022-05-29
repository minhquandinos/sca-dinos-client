import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { map, pluck, takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_REPORT_REFERRAL_LIST_PROVIDER,
    AffiliateReportReferralListQuery,
    AffiliateReportReferralListService
} from '@scaleo/feature/affiliate/reports/statistics/referrals/data-access';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { ReportReferralListTableConfigModel } from '@scaleo/reports/referrals/list';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-affiliate-report-referral-list',
    templateUrl: './affiliate-report-referral-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AFFILIATE_REPORT_REFERRAL_LIST_PROVIDER, UnsubscribeService]
})
export class AffiliateReportReferralListComponent implements OnInit {
    items$ = this.affiliateReportReferralListQuery.selectAll();

    loading$ = this.affiliateReportReferralListQuery.selectLoading();

    pagination$ = this.affiliateReportReferralListQuery.selectDataValue$('pagination');

    totalCount$ = this.pagination$.pipe(pluck('total_count'));

    tableConfig: ReportReferralListTableConfigModel;

    initialDateRange$ = this.affiliateReportReferralListQuery.selectPayload$().pipe(
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

    readonly referralCommissionCurrency: string = this.referralTypeIsFlat
        ? this.platformReferralSettingsService?.referralCommissionCurrency
        : undefined;

    referralCommissionsType: ReferralCommissionsTypeEnum = this.platformReferralSettingsService.referralCommissionsType;

    @ViewChild('referredAffiliateTpl', { static: true })
    private readonly _referredAffiliateTpl: TemplateRef<any>;

    @ViewChild('referredRateTpl', { static: true })
    private readonly _referredRateTpl: TemplateRef<any>;

    @ViewChild('referralCommissionTpl', { static: true })
    private readonly _referralCommissionTpl: TemplateRef<any>;

    constructor(
        private readonly platformReferralSettingsService: PlatformReferralSettingsService,
        private readonly affiliateReportReferralListService: AffiliateReportReferralListService,
        private readonly affiliateReportReferralListQuery: AffiliateReportReferralListQuery,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.affiliateReportReferralListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
        this.tableConfig = {
            headers: this.tableHeaders,
            rowsTemplate: new Map([
                ['referred_affiliate', this._referredAffiliateTpl],
                ['rate', this._referredRateTpl],
                ['referral_commission', this._referralCommissionTpl]
            ])
        };
    }

    pageWasChanged(page: number): void {
        this.affiliateReportReferralListService.updateParamsValue({ page });
    }

    perPageWasChanged(perPage: number): void {
        this.affiliateReportReferralListService.updateParamsValue({ perPage });
    }

    dateWasChanged({ rangeFrom, rangeTo }: CustomDateRangeModel): void {
        this.affiliateReportReferralListService.updatePayloadValue({
            rangeFrom,
            rangeTo
        });
    }

    reload() {
        this.affiliateReportReferralListService.reload();
    }

    private additionalHeaderFilterByRole(header: UiTable2ColumnsModel): boolean {
        if (this.platformReferralSettingsService.referralCommissionsType === ReferralCommissionsTypeEnum.Flat) {
            return header.value !== 'rate';
        }

        return true;
    }

    private get referralTypeIsFlat(): boolean {
        return this.platformReferralSettingsService.referralCommissionsType === ReferralCommissionsTypeEnum.Flat;
    }

    private get tableHeaders(): UiTable2ColumnsModel[] {
        const headers: UiTable2ColumnsModel[] = [
            {
                translate: 'table.column.referral',
                value: 'referral'
            },
            {
                translate: 'table.column.rate',
                value: 'rate'
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
