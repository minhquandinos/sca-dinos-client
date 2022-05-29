import { Component } from '@angular/core';
import { filter, take } from 'rxjs';

import { WindowRefService } from '@scaleo/core/window-ref/service';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { AdvertiserUserProfileEditFormComponent } from '../advertiser-user-profile-edit-form/advertiser-user-profile-edit-form.component';

@Component({
    selector: 'scaleo-advertiser-user-profile',
    templateUrl: './advertiser-user-profile.component.html'
})
export class AdvertiserUserProfileComponent {
    constructor(private readonly modal3: Modal3Service, private readonly windowRefService: WindowRefService) {}

    openModal() {
        this.modal3
            .editForm(AdvertiserUserProfileEditFormComponent, null)
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
}
