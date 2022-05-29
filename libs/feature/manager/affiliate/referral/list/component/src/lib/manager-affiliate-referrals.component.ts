import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { pluck } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseReferralListComponent } from '@scaleo/affiliate/referral/common';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_REFERRAL_LIST_PROVIDER,
    ManagerReferralListQuery,
    ManagerReferralListService
} from '@scaleo/feature/manager/affiliate/referral/list/data-access';
import { MANAGER_ENTITY_DETAIL_TOKEN } from '@scaleo/feature/manager/common/entity-detail';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-referral-list',
    templateUrl: './manager-affiliate-referrals.component.html',
    providers: [FormatPipe, UnsubscribeService, MANAGER_REFERRAL_LIST_PROVIDER]
})
export class ManagerAffiliateReferralsComponent extends BaseReferralListComponent implements OnInit {
    protected _tableHeaders: UiTableHeaderInterface[] = [
        {
            value: 'status',
            key: 'status',
            translateKey: 'table.column.status',
            colWidth: '5%'
        },
        {
            value: 'referral',
            key: 'referral',
            translateKey: 'table.column.referral',
            colWidth: '30%'
        },
        {
            value: 'sign_up_date',
            key: 'sign_up_date',
            translateKey: 'table.column.sign_up_date',
            colWidth: '15%'
        },
        {
            value: 'referral_commission',
            key: 'referral_commission',
            translateKey: 'table.column.referral_commission'
        },
        {
            value: 'referral_commission',
            key: 'referral_commission',
            translateKey: 'table.column.referral_commission_30_day'
        }
    ];

    readonly items$ = this.managerReferralListQuery.selectAll();

    readonly pagination$ = this.managerReferralListQuery.selectDataValue$('pagination');

    readonly totalCount$ = this.pagination$.pipe(pluck('total_count'));

    readonly loading$ = this.managerReferralListQuery.loading$;

    readonly isLoad$ = this.managerReferralListQuery.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    constructor(
        protected readonly formatPipe: FormatPipe,
        protected readonly unsubscribe: UnsubscribeService,
        private readonly managerReferralListService: ManagerReferralListService,
        private readonly managerReferralListQuery: ManagerReferralListQuery,
        protected readonly platformReferralSettingsService: PlatformReferralSettingsService,
        protected readonly fb: FormBuilder,
        @Optional() @Inject(MANAGER_ENTITY_DETAIL_TOKEN) public readonly affiliateId: number
    ) {
        super(fb, platformReferralSettingsService, formatPipe);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.prepareTableHeaders();
        this.managerReferralListService.index(this.affiliateId).pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    setFilterStatus({ newValue }: SelectChangeModel) {
        this.managerReferralListService.updateParamsValue({ status: newValue });
    }

    pageWasChanged(page: number): void {
        this.managerReferralListService.updateParamsValue({ page });
    }

    perPageWasChange(perPage: number): void {
        this.managerReferralListService.updateParamsValue({ perPage, page: 1 });
    }

    private prepareTableHeaders(): void {
        this.tableHeaders = this.tableHeaders?.filter((header: UiTableHeaderInterface) => {
            return !(
                this.referralCommissionsType === ReferralCommissionsTypeEnum.Flat &&
                header.translateKey === 'table.column.referral_commission'
            );
        });
    }
}
