import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { filter, take } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    DOMAIN_UPSERT_PROVIDER,
    DomainUpsertPayloadModel,
    DomainUpsertService
} from '@scaleo/feature/manager/affiliate/domain/data-access';
import { PlatformListsStatusesEnum, PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';
import { CustomValidators } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-affiliate-domain-create',
    templateUrl: './affiliate-domain-create.component.html',
    providers: [DOMAIN_UPSERT_PROVIDER, UnsubscribeService]
})
export class AffiliateDomainCreateComponent implements OnInit {
    readonly editId: number;

    readonly affiliateId: number;

    public form: FormGroup;

    public isLoad: boolean;

    readonly exceptPendingStatus = [PlatformListsStatusesEnum.Pending];

    constructor(
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private toastr: ToastrBarService,
        private readonly domainUpsertService: DomainUpsertService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly modal3Service: Modal3Service,
        private readonly modal3EditFormRef: Modal3EditFormRef
    ) {
        const { editId, affiliateId } = this.modal3EditFormRef.config.data;
        this.editId = editId;
        this.affiliateId = affiliateId;
    }

    ngOnInit(): void {
        this.initForm();

        if (this.editId) {
            this.loadFormData();
        }
    }

    public add() {
        if (this.form.valid) {
            const post: DomainUpsertPayloadModel = { ...this.form.value };

            const addUpdate = this.editId
                ? this.domainUpsertService.update(this.affiliateId, this.editId, post)
                : this.domainUpsertService.create(this.affiliateId, post);

            addUpdate.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
                this.form.reset();
                this.modal3EditFormRef.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);

                const translate = 'affiliate.domain';
                this.toastr.successes(this.translate.instant(this.editId ? `${translate}.edited` : `${translate}.created`));
            });
        } else {
            this.form.markAllAsTouched();
        }
    }

    public delete() {
        const modal$ = this.modal3Service.confirm(this.translate.instant('delete.delete_confirm_text'), {
            title: this.translate.instant('delete.delete_confirm_title')
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.domainUpsertService.delete(this.affiliateId, this.editId)),
                take(1)
            )
            .subscribe(() => {
                this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
                this.toastr.successResponse(this.editId ? 'affiliate.source.deleted' : 'affiliate.source.deleted');
            });
    }

    private initForm() {
        this.form = this.formBuilder.group({
            id: [],
            name: ['', [Validators.required, CustomValidators.domain]],
            status: [PlatformListsStatusesEnum.Active, Validators.required],
            affiliate_id: [this.affiliateId]
        });
    }

    private loadFormData() {
        this.domainUpsertService
            .view(this.affiliateId, this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((domain) => {
                this.form.patchValue({
                    ...domain
                });
                this.isLoad = !this.isLoad;
            });
    }
}
