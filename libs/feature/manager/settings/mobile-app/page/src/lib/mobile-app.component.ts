import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { skip, switchMap, takeUntil } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MobileAppControlEnum,
    MobileAppService,
    SETTINGS_MOBILE_APP_PROVIDER,
    SettingsMobileAppModel
} from '@scaleo/feature/manager/settings/mobile-app/data-access';
import { NewPlatformSettingsService } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'scaleo-mng-mobile-app',
    templateUrl: './mobile-app.component.html',
    providers: [UnsubscribeService, SETTINGS_MOBILE_APP_PROVIDER]
})
export class MobileAppComponent implements OnInit {
    form: FormGroup;

    isLoad = true;

    readonly mobileAppControlEnum = MobileAppControlEnum;

    constructor(
        private readonly fb: FormBuilder,
        private readonly service: MobileAppService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly newPlatformSettingsService: NewPlatformSettingsService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.updateMobileSettingsAfterFormChanges();
        this.loadFormData();
    }

    private updateMobileSettingsAfterFormChanges(): void {
        this.form.valueChanges
            .pipe(
                skip(1),
                switchMap((value) => this.service.update(value)),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                const formValue: SettingsMobileAppModel = this.form.value;
                this.newPlatformSettingsService.updateStore(formValue);
            });
    }

    private initForm(): void {
        this.form = this.fb.group({
            [MobileAppControlEnum.Managers]: BooleanEnum.False,
            [MobileAppControlEnum.Affiliates]: BooleanEnum.False,
            [MobileAppControlEnum.Advertisers]: BooleanEnum.False
        });
    }

    private loadFormData(): void {
        this.service
            .view()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((data) => {
                this.form.patchValue(data);
                this.isLoad = true;
            });
    }
}
