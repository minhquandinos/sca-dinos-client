import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';

import { CONVERSION_STATUSES_ID } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';

import { PrepareRecipientFilterService } from '../prepare-recipient-filter.service';
import { BaseReportConversionsFieldsLinkReportComponent } from './base-report-conversions-fields-link-report.component';

@Component({
    selector: 'app-report-field-cv-rejected',
    templateUrl: './report-field-link-report.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldCvRejectedComponent extends BaseReportConversionsFieldsLinkReportComponent {
    readonly linkPermission = this.permissions?.canAccessConversions;

    constructor(
        protected navigateRootService: NavigateRootService,
        protected prepareRecipientFilterService: PrepareRecipientFilterService,
        @Optional() @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(navigateRootService, prepareRecipientFilterService);
    }

    navigate(): void {
        this.setConversionStatusValues(this.conversionStatusValues);
        this.toReport();
    }

    get conversionStatusValues(): number[] {
        return [CONVERSION_STATUSES_ID.rejected];
    }
}
