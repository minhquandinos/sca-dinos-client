import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, pluck } from 'rxjs';
import { catchError, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { NewProfileService, ProfileModel, ProfileQuery, ProfileRequestModel } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { GeneralSettingsModel, GeneralSettingsService } from '@scaleo/feature/manager/data-access/settings/general';
import { GettingStartedService } from '@scaleo/feature/manager/getting-started/data-access';
import { LanguageDefaultType } from '@scaleo/platform/language/init';
import { LanguageSwitcherService } from '@scaleo/platform/language/switch';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { CustomValidators, ValidationMethods } from '@scaleo/shared/validators';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'manager-getting-started-step-account',
    templateUrl: './step-account.component.html',
    providers: [UnsubscribeService]
})
export class StepAccountComponent implements OnInit {
    form: FormGroup;

    platformForm: FormGroup;

    isLoad: boolean;

    readonly languages$ = this.platformListsService.platformListsNew('languages').pipe(pluck('languages'));

    constructor(
        private formBuilder: FormBuilder,
        private platformSettingsQuery: PlatformSettingsQuery,
        private readonly gettingStartedService: GettingStartedService,
        private validation: ValidationMethods,
        private translate: TranslateService,
        private newProfileService: NewProfileService,
        private profileQuery: ProfileQuery,
        private languageSwitcherService: LanguageSwitcherService,
        private toastr: ToastrBarService,
        private readonly generalSettingsService: GeneralSettingsService,
        private readonly platformListsService: PlatformListsService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.loadFormData();
    }

    skip(): void {
        this.gettingStartedService.skip(this.route);
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, CustomValidators.email]],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required]
        });

        this.platformForm = this.formBuilder.group({
            default_language: new FormControl('', Validators.required),
            currency: new FormControl(''),
            time_zone: new FormControl('')
        });
    }

    private loadFormData(update?: boolean): void {
        this.isLoad = false;

        this.generalSettingsService
            .view()
            .pipe(
                switchMap((settings) => {
                    this.platformForm.patchValue({
                        ...settings
                    });
                    if (update) {
                        return this.newProfileService.get();
                    }
                    return this.profileQuery.profile$;
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe((profile: ProfileModel) => {
                if (update) {
                    this.gettingStartedService.skip(this.route);
                }
                this.form.patchValue({
                    ...profile
                });
                this.isLoad = true;
            });
    }

    save(): void {
        if (this.form.valid && this.platformForm) {
            this.isLoad = false;

            const postProfile: ProfileRequestModel = { ...this.form.getRawValue() };
            const settings: GeneralSettingsModel = { ...this.platformForm.getRawValue() };

            this.generalSettingsService
                .update(settings)
                .pipe(
                    mergeMap((): any =>
                        forkJoin([
                            this.newProfileService.update(postProfile).pipe(
                                // eslint-disable-next-line consistent-return
                                catchError((error) => {
                                    if (/has already been taken/.test(error?.info?.errors?.email?.[0])) {
                                        this.form.get('email').setErrors({ emailAlreadyTaken: true });
                                        this.validation.validateAllFormFields(this.form);
                                        return null;
                                    }
                                    this.toastr.displayValidationMessages(error?.info?.errors);
                                })
                            ),
                            this.gettingStartedService
                                .completeGettingStarted(1)
                                .pipe(switchMap(() => this.gettingStartedService.getCompleteStages()))
                        ])
                    ),
                    takeUntil(this.unsubscribe)
                )
                .subscribe(() => {
                    this.form.reset();
                    this.loadFormData(true);
                    this.toastr.successes(this.translate.instant('user_profile.edited_notification'));
                });
        } else {
            this.validation.validateAllFormFields(this.form);
            this.validation.validateAllFormFields(this.platformForm);
        }
    }

    public changeLanguage(): void {
        const language: LanguageDefaultType = this.platformForm.getRawValue().default_language;
        this.languageSwitcherService.switchLanguage(language);
    }
}
