import { Component, Inject } from '@angular/core';

import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE_TOKEN, PlatformPlanFeatureType } from '@scaleo/platform-permission-plan-common';
import { StatisticDefaultRowModel } from '@scaleo/reports/common';

import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-smartlink',
    template: `<span class="text-pre-wrap" *ngIf="field?.id">
        <app-hyperlink
            [link]="{
                link: '/offers/smart-links' | navigateRoot,
                title: field.id + ' ' + field.value | format: 'idName'
            }"
            [permission]="showLink$ | async"
        ></app-hyperlink>
    </span>`
})
export class ReportFieldSmartlinkComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    readonly showLink$ = this.check.check$([this.planFeatures.smartLink, this.permissions.canAccessOffers], 'every');

    constructor(
        private readonly check: CheckPermissionService,
        @Inject(PLATFORM_PLAN_FEATURE_TOKEN) private readonly planFeatures: PlatformPlanFeatureType,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {
        super();
    }
}
