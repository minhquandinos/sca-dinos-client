import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { pluck, takeUntil } from 'rxjs';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseReferralListComponent } from '@scaleo/affiliate/referral/common';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_ACCESS_LIST_PROVIDER,
    AffiliateAccessReferralListQuery,
    AffiliateAccessReferralListService
} from '@scaleo/feature/affiliate/referral/list/data-access';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { CustomPaginationUtil } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-affiliate-access-referral-list',
    templateUrl: './affiliate-referrals.component.html',
    providers: [FormatPipe, UnsubscribeService, AFFILIATE_ACCESS_LIST_PROVIDER]
})
export class AffiliateReferralsComponent extends BaseReferralListComponent implements OnInit {
    referralCommissionsTypeEnum = ReferralCommissionsTypeEnum;

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
            translateKey: 'table.column.referral_commission_30_day'
        }
    ];

    readonly items$ = this.affiliateAccessReferralListQuery.selectAll();

    readonly pagination$ = this.affiliateAccessReferralListQuery.selectDataValue$('pagination');

    readonly totalCount$ = this.pagination$.pipe(pluck('total_count'));

    readonly loading$ = this.affiliateAccessReferralListQuery.selectLoading();

    readonly isLoad$ = this.affiliateAccessReferralListQuery.isLoad$;

    readonly showPagination$ = CustomPaginationUtil.show$(this.isLoad$, this.totalCount$);

    readonly referralProgram = this.platformReferralSettingsService.referralProgram;

    readonly affiliateId = this.profileQuery.profile.id;

    constructor(
        private readonly profileQuery: ProfileQuery,
        protected unsubscribe: UnsubscribeService,
        private readonly affiliateAccessReferralListService: AffiliateAccessReferralListService,
        private readonly affiliateAccessReferralListQuery: AffiliateAccessReferralListQuery,
        protected readonly platformReferralSettingsService: PlatformReferralSettingsService,
        protected readonly fb: FormBuilder,
        protected readonly formatPipe: FormatPipe,
        private readonly router: Router
    ) {
        super(fb, platformReferralSettingsService, formatPipe);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (this.platformReferralSettingsService.referralProgram) {
            this.affiliateAccessReferralListService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
        } else {
            this.router.navigate(['/affiliate/dashboard']);
        }
    }

    setFilterStatus({ newValue }: SelectChangeModel) {
        this.affiliateAccessReferralListService.updateParamsValue({ status: newValue });
    }

    pageWasChanged(page: number): void {
        this.affiliateAccessReferralListService.updateParamsValue({ page });
    }

    perPageWasChange(perPage: number): void {
        this.affiliateAccessReferralListService.updateParamsValue({ perPage });
    }
}
