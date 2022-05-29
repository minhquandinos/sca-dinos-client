import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { ManagerReferralModel } from '@scaleo/feature/manager/affiliate/referral/data-access';
import { ReferralCommissionsTypeEnum, ReferralsInterface } from '@scaleo/platform/referral/common';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-referrals-list',
    templateUrl: './referrals-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralsListComponent {
    @Input() items: ManagerReferralModel[] | ReferralsInterface[];
    @Input() isLoad: boolean;
    @Input() template: TemplateRef<any>;
    @Input() tableHeaders: UiTableHeaderInterface[];

    commissionsTypeEnum = ReferralCommissionsTypeEnum;

    constructor(public shared: SharedMethodsService) {}
}
