import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, take, throwError } from 'rxjs';

import { AffiliateBillingPreferencesModel, BillingPreferencesService } from '@scaleo/affiliate-billing/preferences/data-access';
import { BaseBillingPreferencesEditComponent } from '@scaleo/affiliate-billing/preferences/edit/common';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { Modal3CloseEventEnum, Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

type AffiliateAccessBillingPreferencesPayload = Omit<AffiliateBillingPreferencesModel, 'payment_terms'>;

@Component({
    selector: 'scaleo-affiliate-billing-preferences-edit',
    templateUrl: './affiliate-access-billing-preferences-edit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class AffiliateAccessBillingPreferencesEditComponent extends BaseBillingPreferencesEditComponent implements OnInit {
    @Input() data: AffiliateBillingPreferencesModel;

    constructor(
        protected fb: FormBuilder,
        private modal3EditFormRef: Modal3EditFormRef,
        private preferencesService: BillingPreferencesService,
        protected unsubscribe: UnsubscribeService,
        private toastr: ToastrBarService,
        private translate: TranslateService
    ) {
        super();
        const { data } = this.modal3EditFormRef.config.data;
        this.data = data;
    }

    ngOnInit(): void {
        this.initForm();
        this.pathDataToForm();
    }

    initForm(): void {
        this.form = this.fb.group({
            beneficiary_name: [],
            beneficiary_address: [],
            billing_email: [],
            tax_id: [],
            vat: []
        });
    }

    pathDataToForm(): void {
        this.form.patchValue({
            beneficiary_name: this.data.beneficiary_name,
            beneficiary_address: this.data.beneficiary_address,
            billing_email: this.data.billing_email,
            tax_id: this.data.tax_id,
            vat: this.data.vat
        });
    }

    save(): void {
        const { valid, value } = this.form;
        if (valid) {
            const payload = {
                ...value,
                vat: !value?.vat ? 0 : value.vat
            };

            this.preferencesService
                .update<AffiliateAccessBillingPreferencesPayload>(payload)
                .pipe(
                    catchError((error) => {
                        this.toastr.error(this.translate.instant('billing2.affiliate.edit.error'));
                        return throwError(error);
                    }),
                    take(1)
                )
                .subscribe(() => {
                    this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Update);
                    this.toastr.successes(this.translate.instant('billing2.affiliate.edit.updated'));
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
