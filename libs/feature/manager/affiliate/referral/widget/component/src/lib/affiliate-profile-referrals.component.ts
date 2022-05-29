import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_AFFILIATE_REFERRAL_WIDGET,
    ManagerAffiliateReferralWidgetQuery,
    ManagerAffiliateReferralWidgetService
} from '@scaleo/feature/manager/affiliate/referral/widget/data-access';
import { ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-affiliate-referral-list',
    templateUrl: './affiliate-profile-referrals.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MANAGER_AFFILIATE_REFERRAL_WIDGET, UnsubscribeService]
})
export class AffiliateProfileReferralsComponent implements OnInit {
    @Input() id: number;

    readonly columns = this.getColumns;

    readonly referrals$ = this.managerAffiliateReferralWidgetQuery.selectAll();

    readonly totalCount$ = this.managerAffiliateReferralWidgetQuery.selectDataValue$('totalCount');

    readonly referralCommissionIsFlat = this.getReferralCommissionIsFlat;

    constructor(
        private readonly managerAffiliateReferralWidgetService: ManagerAffiliateReferralWidgetService,
        private readonly managerAffiliateReferralWidgetQuery: ManagerAffiliateReferralWidgetQuery,
        private readonly platformReferralSettingsService: PlatformReferralSettingsService,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.managerAffiliateReferralWidgetService.index(this.id).pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    private get getColumns(): UiSimpleTableHeaderModel[] {
        return [
            {
                value: 'referral',
                translateSchema: 'table.column.referral',
                width: '40%'
            },
            {
                value: 'sign_up_date',
                translateSchema: 'table.column.sign_up_date',
                width: '20%'
            },
            {
                value: 'referral_commission',
                translateSchema: 'interface.form.referral_commission',
                width: '20%'
            },
            {
                value: 'referral_commission_30_day',
                translateSchema: 'table.column.referral_commission_30_day',
                width: '20%'
            }
        ];
    }

    private get getReferralCommissionIsFlat(): boolean {
        return this.platformReferralSettingsService.referralCommissionsType === ReferralCommissionsTypeEnum.Flat;
    }
}
