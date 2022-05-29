import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';

import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';

import { PrepareRecipientFilterService } from '../prepare-recipient-filter.service';
import { BaseReportFieldLinkReportComponent } from './base-report-field-link-report.component';

@Component({
    selector: 'app-report-field-clicks',
    templateUrl: './report-field-link-report.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldClicksComponent extends BaseReportFieldLinkReportComponent {
    readonly linkPermission = this.permissions?.canAccessClicks;

    constructor(
        private navigateRootService: NavigateRootService,
        private prepareRecipientFilterService: PrepareRecipientFilterService,
        @Optional() @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super();
    }

    navigate(): void {
        this.prepareRecipientFilterService
            .set({
                path: this.navigateRootService.path('/transactions/clicks'),
                breakdown: this.breakdown,
                item: this._item,
                filterData: this.filterData
            })
            .toReport();
    }
}
