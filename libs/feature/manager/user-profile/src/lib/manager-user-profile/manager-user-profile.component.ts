import { Component } from '@angular/core';
import { filter, take } from 'rxjs';

import { WindowRefService } from '@scaleo/core/window-ref/service';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { ManagerUserProfileEditFormComponent } from '../manager-user-profile-edit-form/manager-user-profile-edit-form.component';

@Component({
    selector: 'manager-user-profile',
    templateUrl: './manager-user-profile.component.html',
    styleUrls: ['./manager-user-profile.component.scss']
})
export class ManagerUserProfileComponent {
    constructor(private readonly modal3: Modal3Service, private readonly windowRefService: WindowRefService) {}

    openModal() {
        this.modal3
            .editForm(ManagerUserProfileEditFormComponent, null)
            .afterClosed$.pipe(
                filter(({ type }) => Modal3CloseEventEnum.Update === type),
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
