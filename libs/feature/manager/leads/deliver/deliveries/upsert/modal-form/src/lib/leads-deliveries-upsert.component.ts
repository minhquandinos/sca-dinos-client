import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { exhaustMap, filter, Observable, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { LeadsDeliveryViewModel } from '@scaleo/feature-manager-leads-deliver-deliveries-list-data-access';
import {
    LEADS_DELIVERY_UPSERT_PROVIDER,
    LeadsDeliveriesUpsertService
} from '@scaleo/feature-manager-leads-deliver-deliveries-upsert-data-access';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { ValidationMethods } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-delivery-create',
    templateUrl: './leads-deliveries-upsert.component.html',
    providers: [UnsubscribeService, LEADS_DELIVERY_UPSERT_PROVIDER]
})
export class LeadsDeliveriesUpsertComponent implements OnInit {
    readonly editId: number;

    readonly excludeStatusId = [PlatformListsStatusesEnum.Pending, PlatformListsStatusesEnum.Rejected];

    public isLoad = false;

    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private service: LeadsDeliveriesUpsertService,
        private validation: ValidationMethods,
        private toastr: ToastrBarService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly modal3Ref: Modal3EditFormRef,
        private readonly modal3: Modal3Service
    ) {
        this.editId = this.modal3Ref.config.data.editId;
    }

    ngOnInit(): void {
        this.init();
    }

    private init(): void {
        this.initForm();
        if (this.editId) {
            this.getDetail();
        } else {
            this.isLoad = true;
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: this.editId || undefined,
            title: ['', Validators.required],
            status: [PlatformListsStatusesEnum.Active, Validators.required],
            campaign_id: [undefined, Validators.required],
            instructions: ['', Validators.required],
            notes: '',
            success_reply: ''
        });
    }

    private getDetail(): void {
        this.service
            .view(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((delivery: LeadsDeliveryViewModel) => {
                this.form.patchValue({ ...delivery });
                this.isLoad = true;
            });
    }

    public add(): void {
        if (this.form.valid) {
            const delivery = this.form.getRawValue();

            const addEditRequest: Observable<LeadsDeliveryViewModel> = this.editId
                ? this.service.update(this.editId, delivery)
                : this.service.create(delivery);

            addEditRequest.pipe(take(1)).subscribe({
                next: () => {
                    this.form.reset();
                    this.toastr.successes(
                        this.translate.instant(
                            this.editId ? 'leads_ui_page.deliver.deliveries.edited' : 'leads_ui_page.deliver.deliveries.created'
                        )
                    );
                    this.modal3Ref.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);
                },
                error: (error) => {
                    if (error.info?.errors) {
                        this.toastr.displayValidationMessages(error?.info?.errors);
                    }
                    this.modal3Ref.close(null);
                }
            });
        } else {
            this.form.markAllAsTouched();
        }
    }

    delete(): void {
        const ref$ = this.modal3.confirm(this.translate.instant('leads_ui_page.deliver.deliveries.delete_confirm_text'), {
            title: this.translate.instant('leads_ui_page.deliver.deliveries.delete_confirm_title')
        });

        ref$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                exhaustMap(() => this.service.delete(this.editId)),
                take(1)
            )
            .subscribe(() => {
                this.toastr.successes(this.translate.instant('leads_ui_page.deliver.deliveries.deleted'));
                this.modal3Ref.close(null, Modal3CloseEventEnum.Delete);
            });
    }
}
