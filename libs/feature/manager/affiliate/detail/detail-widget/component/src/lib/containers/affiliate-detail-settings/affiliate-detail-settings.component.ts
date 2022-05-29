import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { AffiliateDetailWidgetModel } from '@scaleo/feature/manager/affiliate/detail/detail-widget/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReferralCommissionSourceEnum, ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

import { AffiliateDetailSettingsEditComponent } from './components/affiliate-detail-settings-edit/affiliate-detail-settings-edit.component';

@Component({
    selector: 'app-affiliate-detail-settings',
    templateUrl: './affiliate-detail-settings.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PlatformReferralSettingsService]
})
export class AffiliateDetailSettingsComponent {
    @Input() set data(data: AffiliateDetailWidgetModel) {
        this.affiliateData = data;
        this.commissionFrom$ = this.getCommissionFrom$;
    }

    @Output()
    changed: EventEmitter<void> = new EventEmitter();

    affiliateData: AffiliateDetailWidgetModel;

    readonly booleanEnum = BooleanEnum;

    readonly apiLink = 'https://developers.scaleo.io/#98193d9b-0d18-4c7d-8952-e8bfb6a8554f';

    readonly referralCommissionsCurrency = this.platformReferralService.referralCommissionCurrency;

    readonly referralCommissionSource = this.platformReferralService.referralCommissionSource;

    readonly showReferralProgram = this.platformReferralService.referralProgram;

    readonly showReferralCommission = this.getShowReferralCommission;

    commissionFrom$: Observable<string>;

    constructor(
        private readonly modal3Service: Modal3Service,
        private readonly translate: TranslateService,
        private readonly toastr: ToastrBarService,
        private readonly platformReferralService: PlatformReferralSettingsService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    editSettings(): void {
        const { affiliateData, apiLink, showReferralProgram, showReferralCommission } = this;

        const modal$ = this.modal3Service.editForm(AffiliateDetailSettingsEditComponent, {
            data: {
                affiliateData,
                apiLink,
                showReferralProgram,
                showReferralCommission
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Update),
                take(1)
            )
            .subscribe(() => {
                this.changed.emit();
                const translate = this.translate.instant('administration_settings.settings.save_notification');
                this.toastr.successes(translate);
            });
    }

    private get getCommissionFrom$(): Observable<string> {
        const referralCommissionSourceTranslateMap: any = {
            [ReferralCommissionSourceEnum.Payout]: 'referrals_page.reports.from_payout',
            [ReferralCommissionSourceEnum.Profit]: 'referrals_page.reports.from_profit',
            [ReferralCommissionSourceEnum.Revenue]: 'referrals_page.reports.from_revenue'
        };

        return this.translate
            .stream(referralCommissionSourceTranslateMap[this.referralCommissionSource])
            .pipe(map((translatedSource) => `${this.affiliateData.referral_commission}% ${translatedSource}`));
    }

    private get getShowReferralCommission(): boolean {
        return this.platformReferralService.referralCommissionsType === ReferralCommissionsTypeEnum.Percentage;
    }
}
