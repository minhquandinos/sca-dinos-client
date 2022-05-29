import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LanguageEnum } from '@scaleo/platform/language/init';
import { PlanType, PlatformPlanFeatureUnionType } from '@scaleo/platform-permission-plan-common';
import { PlanFeatureService } from '@scaleo/platform-permission-plan-service';

@Component({
    selector: 'app-upgrade-plan-info',
    templateUrl: './upgrade-plan-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpgradePlanInfoComponent implements OnInit {
    @Input() planPermission: PlatformPlanFeatureUnionType;

    @Input() icon = 'upgrade_plane';

    @HostBinding('class') hostClass = 'upgrade-plan-info';

    public planForUpgrade: PlanType;

    public readonly urlToPricing = this.getUrlToPricing;

    constructor(private planPermissionsService: PlanFeatureService, private translate: TranslateService) {}

    ngOnInit(): void {
        this.planForUpgrade = this.planPermissionsService.featureInPlan(this.planPermission);
    }

    private get getUrlToPricing(): string {
        const currentPlatformLang = this.translate.currentLang || LanguageEnum.English;
        return `https://www.scaleo.io/${currentPlatformLang}/pricing`;
    }
}
