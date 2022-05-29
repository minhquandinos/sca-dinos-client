import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { pluck, take, zip } from 'rxjs';

import { NewProfileService, ProfileQuery, ProfileRequestModel } from '@scaleo/account/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { SignupAffiliateService } from '@scaleo/feature/auth/signup/affiliate/data-access';
import { AbstractProfileFormComponent } from '@scaleo/feature/shared/user-profile/common';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ConfigCustomFieldService } from '@scaleo/shared/data-access/custom-fields';
import { Modal3CloseEventEnum, Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-affiliate-user-profile-edit-form',
    templateUrl: './affiliate-user-profile-edit-form.component.html',
    providers: [ConfigCustomFieldService, { provide: 'CUSTOM_FIELDS_CONFIG', useValue: 'aff_custom_fields' }]
})
export class AffiliateUserProfileEditFormComponent extends AbstractProfileFormComponent implements OnInit {
    readonly customFieldsConfig$ = this.customFieldService.customFieldsConfig$;

    readonly profileData$ = this.profileQuery.profile$;

    constructor(
        public formBuilder: FormBuilder,
        public translate: TranslateService,
        public platformListsService: PlatformListsService,
        protected newProfileService: NewProfileService,
        protected profileQuery: ProfileQuery,
        private customFieldService: ConfigCustomFieldService,
        private signupAffiliateService: SignupAffiliateService,
        private platformSettingsQuery: PlatformSettingsQuery,
        protected toastr: ToastrBarService,
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

    save(): void {
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
            this.signupAffiliateService.getFields().pipe(pluck('standard-fields')),
            this.platformSettingsQuery.settings$.pipe(pluck('aff_required_fields'))
        ])
            .pipe(take(1))
            .subscribe(([fields, requireFields]) => {
                this.basicLoadRequireField(fields, requireFields);
            });
    }
}
