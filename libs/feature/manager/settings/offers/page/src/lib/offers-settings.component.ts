import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OffersSettingsModel, OffersSettingsService } from '@scaleo/feature/manager/data-access/settings/offers';
import { NewPlatformSettingsService } from '@scaleo/platform/settings/access-data';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'manager-settings-offers',
    templateUrl: './offers-settings.component.html',
    providers: [UnsubscribeService]
})
export class OffersSettingsComponent implements OnInit {
    form: FormGroup;

    constructor(
        private readonly platformSettingsService: NewPlatformSettingsService,
        private readonly service: OffersSettingsService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly fb: FormBuilder,
        private readonly toastr: ToastrBarService,
        private readonly translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.view();
    }

    update(): void {
        if (this.form.valid) {
            const post = this.form.value as OffersSettingsModel;
            const ADMINISTRATION_SETTINGS_OFFERS_SCHEMA = 'administration_settings.offers';
            this.service
                .update(post)
                .pipe(
                    catchError(() => {
                        this.toastr.response(ToastrBarEventEnum.ExceptionUpdated, `${ADMINISTRATION_SETTINGS_OFFERS_SCHEMA}.title`);
                        return EMPTY;
                    }),
                    takeUntil(this.unsubscribe)
                )
                .subscribe(() => {
                    this.platformSettingsService.updateStore(post);
                    const translate = this.translate.instant(`${ADMINISTRATION_SETTINGS_OFFERS_SCHEMA}.update_message`);
                    this.toastr.successes(translate);
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    private initForm(): void {
        this.form = this.fb.group({
            approval_questions_for_affiliate: ['', Validators.required],
            ask_approval_questions_by_default: BooleanEnum.False
        });
    }

    private view(): void {
        this.service
            .view()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((data) => this.form.patchValue({ ...data }));
    }
}
