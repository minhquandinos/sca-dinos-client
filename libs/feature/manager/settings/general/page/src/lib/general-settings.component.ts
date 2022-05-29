import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { pluck, switchMap, takeUntil } from 'rxjs/operators';

import { NewProfileService } from '@scaleo/account/data-access';
import { BaseIdTitleModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { WindowRefService } from '@scaleo/core/window-ref/service';
import { GeneralSettingsModel, GeneralSettingsService } from '@scaleo/feature/manager/data-access/settings/general';
import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { LanguageDefaultType } from '@scaleo/platform/language/init';
import { LanguageSwitcherService } from '@scaleo/platform/language/switch';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { NewPlatformSettingsService } from '@scaleo/platform/settings/access-data';
import { CustomValidators, ValidationMethods } from '@scaleo/shared/validators';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'manager-settings-settings',
    templateUrl: './general-settings.component.html',
    providers: [UnsubscribeService]
})
export class GeneralSettingsComponent implements OnInit {
    form: FormGroup;

    settings: GeneralSettingsModel;

    languages$ = this.platformListsService.platformListsNew('languages').pipe(pluck('languages'));

    private onlyDateRange = [
        CustomDateRangeTitleEnum.Today,
        CustomDateRangeTitleEnum.Last14Days,
        CustomDateRangeTitleEnum.Last30Days,
        CustomDateRangeTitleEnum.ThisMonth
    ];

    readonly defaultDateRangeList: BaseIdTitleModel<string>[] = [
        ...(Object.keys(CustomDateRangeTitleEnum) as any[])
            .filter((range: keyof typeof CustomDateRangeTitleEnum) => {
                return this.onlyDateRange.includes(CustomDateRangeTitleEnum[range]);
            })
            .map((range: keyof typeof CustomDateRangeTitleEnum) => ({
                id: CustomDateRangeTitleEnum[range],
                title: CustomDateRangeTitleEnum[range]
            }))
    ];

    constructor(
        private newPlatformSettingsService: NewPlatformSettingsService,
        private readonly platformListsService: PlatformListsService,
        public translate: TranslateService,
        private validation: ValidationMethods,
        private newProfileService: NewProfileService,
        private languageService: LanguageSwitcherService,
        private toastr: ToastrBarService,
        private window: WindowRefService,
        private unsubscribe: UnsubscribeService,
        private readonly generalSettingsService: GeneralSettingsService
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            default_language: new FormControl('', Validators.required),
            currency: new FormControl(''),
            show_language_selection: new FormControl(1, Validators.required),
            custom_domain: new FormControl('', Validators.required),
            internal_domain: new FormControl('', Validators.required),
            tracking_domain: new FormControl('', Validators.required),
            global_trafficback_url: new FormControl('', [Validators.required, CustomValidators.checkUrl]),
            mailroom_email_address: new FormControl('', [Validators.required, Validators.email]),
            time_zone: new FormControl(''),
            mailroom_access_levels: new FormControl(''),
            show_getting_started: new FormControl(1),
            default_daterange: new FormControl(CustomDateRangeTitleEnum.Last14Days)
        });
        this.initForm();
    }

    private initForm(): void {
        // this.form.disable();
        this.generalSettingsService
            .view()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((settings) => {
                this.settings = settings;
                this.pathForm();

                // this.form.enable();
                // this.form.get('custom_domain').disable();
                // this.form.get('internal_domain').disable();
                // this.form.get('tracking_domain').disable();
                // this.form.get('time_zone').disable();
                // this.form.get('currency').disable();
                // this.form.get('mailroom_email_address').disable();
            });
    }

    private pathForm(): void {
        this.form.patchValue({
            default_language: this.settings.default_language,
            currency: this.settings.currency,
            show_language_selection: this.settings.show_language_selection,
            custom_domain: this.settings.custom_domain,
            internal_domain: this.settings.internal_domain,
            tracking_domain: this.settings.tracking_domain,
            global_trafficback_url: this.settings.global_trafficback_url,
            mailroom_email_address: this.settings.mailroom_email_address,
            mailroom_access_levels: this.settings.mailroom_access_levels.split(','),
            time_zone: this.settings.time_zone,
            show_getting_started: this.settings.show_getting_started,
            default_daterange: this.settings.default_daterange
        });
    }

    public save(): void {
        const urlPattern = /http/;
        if (
            this.form.get('global_trafficback_url').value !== '' &&
            !!urlPattern.test(this.form.get('global_trafficback_url').value) === false
        ) {
            this.form.patchValue({
                global_trafficback_url: `https://${this.form.get('global_trafficback_url').value}`
            });
        }
        if (this.form.valid) {
            const settings: GeneralSettingsModel = { ...this.form.getRawValue() };
            settings.mailroom_access_levels = this.form.value.mailroom_access_levels.join(',');

            this.generalSettingsService
                .update(settings)
                .pipe(
                    switchMap(() => this.newProfileService.get()),
                    switchMap(() => this.newPlatformSettingsService.getPlatformSettings()),
                    takeUntil(this.unsubscribe)
                )
                .subscribe(() => {
                    if (this.settings.default_daterange !== this.form.value.default_daterange) {
                        setTimeout(() => {
                            this.window.nativeWindow.location.reload();
                        }, 5000);
                    }
                    this.toastr.successes(this.translate.instant('administration_settings.settings.save_notification'));
                });
        } else {
            this.validation.validateAllFormFields(this.form);
        }
    }

    public changeLanguage(): void {
        const language: LanguageDefaultType = this.form.getRawValue().default_language;
        console.log(language);
        this.languageService.switchLanguage(language);
    }
}
