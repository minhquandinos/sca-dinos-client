import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

import { NewProfileService, ProfileQuery, ProfileRequestModel } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AbstractProfileFormComponent } from '@scaleo/feature/shared/user-profile/common';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { ApiAccessStatusEnum } from '@scaleo/shared/components';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { Modal3CloseEventEnum, Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'manager-user-profile-edit-form',
    templateUrl: './manager-user-profile-edit-form.component.html',
    providers: [UnsubscribeService]
})
export class ManagerUserProfileEditFormComponent extends AbstractProfileFormComponent implements OnInit {
    readonly profileData$ = this.profileQuery.profile$;

    readonly baseRole$ = this.profileQuery.baseRole$;

    constructor(
        protected formBuilder: FormBuilder,
        private translate: TranslateService,
        public platformListsService: PlatformListsService,
        protected newProfileService: NewProfileService,
        protected profileQuery: ProfileQuery,
        protected toastr: ToastrBarService,
        protected unsubscribe: UnsubscribeService,
        private modal3EditFormRef: Modal3EditFormRef
    ) {
        super(newProfileService, toastr, formBuilder);
    }

    ngOnInit(): void {
        this.initForm();
        this.removePasswordOnFormControll();
    }

    save(): void {
        if (this.form.valid) {
            this.initSave();
        } else {
            this.form.markAllAsTouched();
        }
    }

    refreshApi(): void {
        this.newProfileService
            .updateApiKey(this.profileQuery.profile.id, this.profileQuery.role)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((apiKey: string) => {
                this.form.patchValue({
                    api_key: apiKey
                });
                this.toastr.successes(this.translate.instant('notifications.refresh_api'));
            });
    }

    protected override initForm(): void {
        const addField = {
            show_email_for_users: [1]
        };
        super.initForm(addField);
        this.initStaticData(this.profileQuery.profile);
    }

    initSave(): void {
        const post: ProfileRequestModel = {
            ...this.form.getRawValue(),
            contacts: this.addContactComponent.removeEmptyContacts()
        };

        this.saveFormData(post).subscribe(() => {
            this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Update);
            this.toastr.successes(this.translate.instant('user_profile.edited_notification'));
        });
    }
}
