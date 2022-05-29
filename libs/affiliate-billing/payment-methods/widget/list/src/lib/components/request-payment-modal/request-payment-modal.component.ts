import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { PlatformCurrencyService } from '@scaleo/platform/currency/service';
import { FileExtensionEnum } from '@scaleo/platform/data';
import { FormatService } from '@scaleo/platform/format/service';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { minMaxValidation } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3Ref } from '@scaleo/ui-kit/components/modal3';

const ATTACHMENT_FILE_EXTENSION: FileExtensionEnum[] = [
    FileExtensionEnum.PDF,
    FileExtensionEnum.JPG,
    FileExtensionEnum.PNG,
    FileExtensionEnum.DOC,
    FileExtensionEnum.XLS,
    FileExtensionEnum.CSV
];

const attachmentFileExtensionUtil = (): any => ATTACHMENT_FILE_EXTENSION.map((file) => file.toUpperCase()).join(', ');

@Component({
    selector: 'app-request-payment-modal',
    templateUrl: './request-payment-modal.component.html'
})
export class RequestPaymentModalComponent implements OnInit {
    public form: FormGroup;

    readonly minAmount: number;

    readonly defaultAmount: number;

    readonly currency: string;

    currencySign: string;

    readonly allowAttachment: boolean;

    public readonly attachmentFileExtension = attachmentFileExtensionUtil();

    readonly allowedAcceptFile = ATTACHMENT_FILE_EXTENSION;

    @HostBinding('class') hostClass = 'request-payment-modal';

    amountCondition$: Observable<string>;

    constructor(
        private formBuilder: FormBuilder,
        private platformSettingsQuery: PlatformSettingsQuery,
        private translate: TranslateService,
        private format: FormatService,
        private readonly modal3Ref: Modal3Ref,
        private readonly platformCurrencyService: PlatformCurrencyService
    ) {
        const { allow_an_attachment } = platformSettingsQuery.settings;
        this.allowAttachment = allow_an_attachment;
        const { minAmount = undefined, defaultAmount = undefined, currency = undefined } = this.modal3Ref.config?.data || {};
        this.minAmount = minAmount;
        this.defaultAmount = defaultAmount;
        this.currency = currency;
    }

    ngOnInit(): void {
        this.initForm();
        this.currencySign = this.platformCurrencyService.sign(this.currency);
        this.setAttachmentFormControl();

        this.amountCondition$ = this.translate.stream('finances_page.details.amount_condition', {
            min: this.format.format(this.minAmount, 'money', { currency: this.currency }),
            max: this.format.format(this.defaultAmount, 'money', { currency: this.currency })
        });
    }

    save(): void {
        if (this.form.valid) {
            this.modal3Ref.close(this.form.value, Modal3CloseEventEnum.Apply);
        } else {
            this.form.markAllAsTouched();
        }
    }

    cancel(): void {
        this.modal3Ref.close();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            amount: [this.defaultAmount, [Validators.required, minMaxValidation(this.minAmount, this.defaultAmount)]]
        });
    }

    private setAttachmentFormControl(): void {
        if (this.allowAttachment) {
            this.form.addControl('attachment_file', this.formBuilder.control(''));
        }
    }
}
