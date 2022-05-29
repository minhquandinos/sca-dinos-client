import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';

import { ShortResponseInterface } from '@scaleo/core/data';
import { CONVERSION_STATUSES_ID } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { NavigateRootService } from '@scaleo/shared/components';

import { PrepareRecipientFilterService } from '../prepare-recipient-filter.service';
import { BaseReportConversionsFieldsLinkReportComponent } from './base-report-conversions-fields-link-report.component';

@Component({
    selector: 'app-report-field-cv-total',
    templateUrl: './report-field-link-report.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldCvTotalComponent extends BaseReportConversionsFieldsLinkReportComponent {
    readonly linkPermission = this.permissions?.canAccessConversions;

    constructor(
        private settingsQuery: PlatformSettingsQuery,
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
        const conversionStatusValues: ShortResponseInterface[] = [
            {
                id: CONVERSION_STATUSES_ID.approved,
                title: 'Approved'
            },
            {
                id: CONVERSION_STATUSES_ID.pending,
                title: 'Pending'
            },
            {
                id: CONVERSION_STATUSES_ID.rejected,
                title: 'Rejected'
            },
            {
                id: CONVERSION_STATUSES_ID.trash,
                title: 'Trash'
            }
        ];

        if (!this.settingsQuery.settings.include_rejected_in_totals) {
            return conversionStatusValues.filter((status) => status.id !== CONVERSION_STATUSES_ID.rejected).map((status) => status.id);
        }

        return conversionStatusValues.map((status) => status.id);
    }
}
