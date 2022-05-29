import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BASE_ROLE, DefaultRoleEnum } from '@scaleo/platform/role/models';
import { NotificationHeaderType } from '@scaleo/shared/components';
import { TrialStatusService } from '@scaleo/trial-service';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-trial-notification-message',
    templateUrl: './trial-notification-message.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrialNotificationMessageComponent implements OnInit {
    trialName: string;

    isTrial: boolean;

    trialExpiredDays: any;

    trialNotificationColor: NotificationHeaderType = 'info';

    @ViewChild('trialInfoTemplate') trialInfoTemplate: TemplateRef<any>;

    readonly baseRole = BASE_ROLE;

    constructor(
        private readonly trialStatusService: TrialStatusService,
        private readonly profileQuery: ProfileQuery,
        private readonly translate: TranslateService,
        private readonly modal3Service: Modal3Service
    ) {}

    ngOnInit(): void {
        this.loadForAdmin();
    }

    isTrialAccount(): void {
        this.isTrial = this.trialStatusService.getTrial;
        if (this.isTrial) {
            this.trialName = `${this.profileQuery.profile.firstname} ${this.profileQuery.profile.lastname}`;

            const startDate = moment();
            const endDate = this.trialStatusService.getTrialExpiredDays;
            let expired = endDate.diff(startDate, 'days', true);

            if (Math.ceil(expired) >= 14) {
                expired = Math.floor(expired);
            } else {
                expired = Math.ceil(expired);
            }

            this.trialExpiredDays = +expired >= 0 ? expired : 0;

            if (this.trialExpiredDays <= 0) {
                setTimeout(() => {
                    this.modal3Service.info(this.trialInfoTemplate, {
                        title: this.translate.instant('trial.modal_info.title'),
                        disableClose: true
                    });
                }, 0);
            }

            if (this.trialExpiredDays <= 3) {
                this.trialNotificationColor = 'warning';
            }
        }
    }

    private loadForAdmin(): void {
        if (this.profileQuery.role === DefaultRoleEnum.Admin) {
            this.isTrialAccount();
        }
    }
}
