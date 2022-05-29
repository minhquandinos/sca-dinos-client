import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { pluck, take, zip } from 'rxjs';

import { NewProfileService, ProfileQuery, ProfileRequestModel } from '@scaleo/account/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { SignupAdvertiserService } from '@scaleo/feature/auth/signup/advertiser/data-access';
import { AbstractProfileFormComponent } from '@scaleo/feature/shared/user-profile/common';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ConfigCustomFieldService } from '@scaleo/shared/data-access/custom-fields';
import { Modal3CloseEventEnum, Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-advertiser-user-profile-edit-form',
    templateUrl: './advertiser-user-profile-edit-form.component.html',
    providers: [ConfigCustomFieldService, { provide: 'CUSTOM_FIELDS_CONFIG', useValue: 'adv_custom_fields' }]
})
export class AdvertiserUserProfileEditFormComponent extends AbstractProfileFormComponent implements OnInit {
    readonly profileData$ = this.profileQuery.profile$;

    readonly customFieldsConfig$ = this.customFieldService.customFieldsConfig$;

    constructor(
        protected formBuilder: FormBuilder,
        protected platformListsService: PlatformListsService,
        protected translate: TranslateService,
        protected newProfileService: NewProfileService,
        protected profileQuery: ProfileQuery,
        private customFieldService: ConfigCustomFieldService,
        private platformSettingsQuery: PlatformSettingsQuery,
        protected toastr: ToastrBarService,
        private signupAdvertiserService: SignupAdvertiserService,
        private modal3EditFormRef: Modal3EditFormRef,
        private readonly cdr: ChangeDetectorRef
    ) {
        super(newProfileService, toastr, formBuilder);
    }

    ngOnInit(): void {
        this.initForm();
        this.removePasswordOnFormControll();
        this.loadRequireField();
    }

    public save(): void {
        if (this.form.valid) {
            this.initSave();
        } else {
            this.form.markAllAsTouched();
        }
    }

    protected override initForm(): void {
        const addField: BaseObjectModel = {
            address: [''],
            city: [''],
            region: [''],
            country: [null],
            postal_code: [''],
            payment_details: [null],
            custom_fields: this.customFieldService.createCustomFieldsGroup(),
            managers_assigned: []
        };
        super.initForm(addField);
        this.initStaticData(this.profileQuery.profile);
        this.cdr.detectChanges();
    }

    initSave(): void {
        const post: ProfileRequestModel = {
            ...this.form.getRawValue(),
            contacts: this.addContactComponent.removeEmptyContacts(),
            custom_fields: this.customFieldService.convertCustomFieldsToString(this.form.value.custom_fields)
        };

        this.saveFormData(post).subscribe(() => {
            this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Update);
            this.toastr.successes(this.translate.instant('user_profile.edited_notification'));
        });
    }

    loadRequireField(): void {
        zip([
            this.signupAdvertiserService.getFields().pipe(pluck('standard-fields')),
            this.platformSettingsQuery.settings$.pipe(pluck('adv_custom_fields'))
        ])
            .pipe(take(1))
            .subscribe(([fields, requireFields]) => {
                this.basicLoadRequireField(fields, requireFields);
            });
    }
}
