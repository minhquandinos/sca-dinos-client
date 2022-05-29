import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_REPORT_CONVERSION_UPSERT_PROVIDER,
    ManagerReportConversionUpsertService
} from '@scaleo/feature/manager/reports/transactions/conversion/upsert/data-access';
import { Modal3CloseEventEnum, Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

@Component({
    selector: 'app-conversion-edit-modal',
    templateUrl: './conversion-edit-modal.component.html',
    providers: [FormGroupDirective, UnsubscribeService, MANAGER_REPORT_CONVERSION_UPSERT_PROVIDER]
})
export class ConversionEditModalComponent implements OnInit {
    readonly id: string;

    readonly customFieldsControlsMap: string[] = this.getCustomFieldsControlsMap;

    form: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private readonly unsubscribe: UnsubscribeService,
        private readonly managerReportConversionUpsertService: ManagerReportConversionUpsertService,
        private readonly translate: TranslateService,
        private readonly toaster: ToastrBarService,
        private readonly modal3EditFormRef: Modal3EditFormRef
    ) {
        this.id = this.modal3EditFormRef.config.data?.id;
    }

    ngOnInit(): void {
        this.initForm();
        this.loadData();
    }

    save(): void {
        if (this.form.valid) {
            this.managerReportConversionUpsertService
                .update(this.form.value)
                .then(() => {
                    this.toaster.successes(this.translate.instant('reports_page.conversions.edit.updated_message'));
                    this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Update);
                })
                .catch((error) => this.toaster.displayValidationMessages(error?.info?.errors));
        } else {
            this.form.markAllAsTouched();
        }
    }

    private initForm(): void {
        const customFieldsControls = new Map(this.customFieldsControlsMap.map((elem) => [elem, '']));

        this.form = this.fb.group({
            lead_id: this.id,
            email: '',
            phone: '',
            firstname: '',
            lastname: '',
            address: '',
            city: '',
            region: '',
            country: '',
            postcode: '',
            gender: '',
            birthday: '',
            vertical: '',
            ip: '',
            ...Object.fromEntries(customFieldsControls),
            public_notes: '',
            private_notes: ''
        });
    }

    private loadData(): void {
        this.managerReportConversionUpsertService.view(this.id).then((data) => this.form.patchValue({ ...data }));
    }

    private get getCustomFieldsControlsMap(): string[] {
        return ArrayUtil.createContainingArray(10, 'numeric').map((elem) => `custom${elem}`);
    }
}
