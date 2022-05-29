import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ValidationMethods } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

import { EmailTemplatesInterface } from '../../email-templates.interface';
import { EmailTemplatesService } from '../../email-templates.service';

@Component({
    selector: 'app-email-templates-edit',
    templateUrl: './email-templates-edit.component.html',
    providers: [EmailTemplatesService, UnsubscribeService]
})
export class EmailTemplatesEditComponent implements OnInit {
    readonly editId: number;

    form: FormGroup;

    isLoad: boolean;

    title: string;

    showCheckboxSendCopy: boolean;

    translatePathForDescription: string;

    constructor(
        private modal3EditFormRef: Modal3EditFormRef,
        private modal3Service: Modal3Service,
        private emailTemplatesService: EmailTemplatesService,
        private formBuilder: FormBuilder,
        private validation: ValidationMethods,
        private translate: TranslateService,
        private toastr: ToastrBarService,
        private unsubscribe: UnsubscribeService
    ) {
        this.editId = this.modal3EditFormRef.config.data?.editId;
    }

    ngOnInit(): void {
        this.initForm();
        this.loadFormData();
    }

    save() {
        if (this.form.valid) {
            const post: EmailTemplatesInterface = { ...this.form.value };

            this.emailTemplatesService
                .update(this.editId, post)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(() => {
                    this.form.reset();
                    this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Update);
                    this.toastr.successes(this.translate.instant('administration_settings.email_templates.edit.edited'));
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    private initForm() {
        this.form = this.formBuilder.group({
            id: [],
            subject: ['', Validators.required],
            body: ['', Validators.required],
            template_key: [],
            category: [],
            title: [],
            contacts: [],
            description: [],
            tokens: [],
            display_send_copy_option: [],
            send_copy_to_managers: [],
            body_wysiwyg_editor: [],
            hidden: [],
            sort: []
        });
    }

    private loadFormData() {
        this.isLoad = false;
        this.emailTemplatesService
            .view(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((email: EmailTemplatesInterface) => {
                const listForSendCopy = ['affiliate_welcome_email', 'advertiser_welcome_email'];
                const { translatePathForDescription, title } = email;
                this.translatePathForDescription = translatePathForDescription;
                this.title = title;
                this.form.patchValue(email);
                this.showCheckboxSendCopy = listForSendCopy.includes(title);
                this.isLoad = true;
            });
    }

    private restoreToDefault() {
        const modalRef$ = this.modal3Service.confirm(
            this.translate.instant('administration_settings.email_templates.edit.reset_to_default_text'),
            {
                title: this.translate.instant('administration_settings.email_templates.edit.reset_to_default_title'),
                actionLabel: this.translate.instant('administration_settings.email_templates.edit.action')
            }
        );
        modalRef$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.emailTemplatesService.restoreToDefault()),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.toastr.successes(this.translate.instant('administration_settings.email_templates.edit.edited'));
            });
    }
}
