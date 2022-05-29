import { Component } from '@angular/core';
import { filter, take } from 'rxjs';

import { WindowRefService } from '@scaleo/core/window-ref/service';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { AffiliateUserProfileEditFormComponent } from '../affiliate-user-profile-edit-form/affiliate-user-profile-edit-form.component';

@Component({
    selector: 'affiliate-user-profile',
    templateUrl: './affiliate-user-profile.component.html'
})
export class AffiliateUserProfileComponent {
    constructor(private readonly modal3: Modal3Service, private readonly windowRefService: WindowRefService) {}

    openModal() {
        this.modal3
            .editForm(AffiliateUserProfileEditFormComponent, null)
            .afterClosed$.pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Update),
                take(1)
            )
            .subscribe(() => {
                setTimeout(() => {
                    this.windowRefService.nativeWindow.location.reload();
                }, 1000);
            });
    }

    showInfo(billing: string) {}
}
