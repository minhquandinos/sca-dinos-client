import { Component } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AffiliateAnnouncementsViewModalComponent } from '@scaleo/feature/affiliate/dashboard/widgets/announcements/view-modal';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-notifications',
    templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
    constructor(private profileQuery: ProfileQuery, private modal3Service: Modal3Service) {}

    public openNotification(): void {
        this.modal3Service.editForm(AffiliateAnnouncementsViewModalComponent, {
            wrapperClassName: 'announcements-modal-form',
            contentClassName: 'p-0'
        });
    }
}
