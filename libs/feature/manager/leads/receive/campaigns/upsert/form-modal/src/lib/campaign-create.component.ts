import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { defer, EMPTY, take, throwError } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    CampaignFieldTypeEnum,
    LeadsReceiveCampaignFieldModel,
    receiveLeadsCampaignStatuses
} from '@scaleo/feature/manager/leads/receive/common';
import {
    CampaignFieldValidationsModel,
    CampaignFieldValidationsPostModel,
    LEADS_RECEIVE_CAMPAIGN_UPSERT_PROVIDER,
    LeadsReceiveCampaignUpsertService,
    LeadsReceiveCampaignViewModel
} from '@scaleo/feature-manager-leads-receive-campaigns-upsert-data-access';
import { CampaignFieldValidationTypeEnum, PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { StatusesId, ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

import { CampaignCreateFieldService } from './components/campaign-create-fields/campaign-create-field/campaign-create-field.service';
import { CampaignFieldValidationsService } from './components/campaign-field-validations/campaign-field-validations.service';

const CAMPAIGN_TRANSLATE_SCHEMA = 'table.column.campaign';

@Component({
    selector: 'app-campaign-create',
    templateUrl: './campaign-create.component.html',
    providers: [LEADS_RECEIVE_CAMPAIGN_UPSERT_PROVIDER, UnsubscribeService, CampaignCreateFieldService, CampaignFieldValidationsService]
})
export class CampaignCreateComponent implements OnInit {
    readonly editId: number;

    readonly title: string;

    isLoad = false;

    form: FormGroup;

    public readonly campaignStatuses = receiveLeadsCampaignStatuses;

    readonly excludeStatusId = [PlatformListsStatusesEnum.Pending, PlatformListsStatusesEnum.Rejected];

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly translate: TranslateService,
        private readonly service: LeadsReceiveCampaignUpsertService,
        private readonly toastr: ToastrBarService,
        private readonly campaignCreateFieldService: CampaignCreateFieldService,
        private readonly campaignFieldValidationsService: CampaignFieldValidationsService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly modal3Ref: Modal3EditFormRef,
        private readonly modal3: Modal3Service
    ) {
        this.editId = this.modal3Ref.config.data.editId;
        this.title = this.getTile;
    }

    ngOnInit(): void {
        this.init();
    }

    changedOffer(offer: SelectChangeModel) {
        if (offer.newValue) {
            this.form.get('goal_id').setValue(null);
        }
    }

    add(): void {
        if (this.form.valid) {
            defer(() => (this.editId ? this.update$ : this.save$))
                .pipe(take(1))
                .subscribe({
                    error: ({ info: { errors = undefined } = {} }) => {
                        console.log(errors);
                        this.toastr.displayValidationMessages(errors);
                    }
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    delete(): void {
        const content = this.translate.instant('leads_ui_page.receive.campaigns.delete_confirm_text');
        const title = this.translate.instant('leads_ui_page.receive.campaigns.delete_confirm_title');
        this.modal3
            .confirm(content, { typeButton: 'delete', title })
            .afterClosed$.pipe(switchMap(({ type }) => (type === Modal3CloseEventEnum.Confirm ? this.delete$ : EMPTY)))
            .toPromise()
            .then();
    }

    private init(): void {
        this.initForm();
        if (this.editId) {
            this.getDetail();
        } else {
            this.createFirstField();
            this.isLoad = true;
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: this.editId || undefined,
            title: ['', Validators.required],
            offer_id: [undefined, Validators.required],
            status: [StatusesId.Active, Validators.required],
            goal_id: [undefined, Validators.required],
            notes: '',
            fields: this.formBuilder.array([]),
            validations: this.formBuilder.array([]),
            additional_info_for_reply: ''
        });
    }

    private getDetail(): void {
        this.service
            .view(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((campaign: LeadsReceiveCampaignViewModel) => {
                this.form.patchValue({ ...campaign });
                this.loadFields(campaign.fields);
                this.loadValidations(campaign.validations);
                this.isLoad = true;
            });
    }

    private loadFields(fields: LeadsReceiveCampaignFieldModel[]) {
        if (fields.length > 0) {
            fields.forEach((field) => {
                (this.form.get('fields') as FormArray).push(this.addField(field));
            });
        }
    }

    private createFirstField() {
        const defaultField: LeadsReceiveCampaignFieldModel = {
            type: CampaignFieldTypeEnum.Required,
            value: null,
            name: null
        };
        (this.form.get('fields') as FormArray).push(this.addField(defaultField));
    }

    private addField(field: LeadsReceiveCampaignFieldModel): FormGroup {
        return this.campaignCreateFieldService.addField(field);
    }

    private loadValidations(validations: CampaignFieldValidationsModel[]) {
        console.log(validations);
        validations.forEach((validation) => this.createValidation(validation));
    }

    private createValidation(validation?: CampaignFieldValidationsModel) {
        const createdValidation: FormGroup = this.campaignFieldValidationsService.addValidation(validation);
        (this.form.get('validations') as FormArray).push(createdValidation);
    }

    private formatValidations(validations: CampaignFieldValidationsModel[]): CampaignFieldValidationsPostModel[] {
        return validations.map((validation) => ({
            name: validation.name,
            type: validation.type,
            value:
                validation.type === CampaignFieldValidationTypeEnum.Format
                    ? (validation.value as string[]).join(',')
                    : (validation.value as string)
        }));
    }

    private get getTile(): string {
        const path = 'leads_ui_page.receive.campaigns';
        const translate = this.translate.instant(this.editId ? `${path}.edit` : `${path}.creating`);
        return this.editId ? `${translate} #${this.editId}` : translate;
    }

    private get save$() {
        return this.service.create(this.getFormValue).pipe(
            tap(() => {
                this.modal3Ref.close(null, Modal3CloseEventEnum.Create);
                this.toastr.successes(this.translate.instant('leads_ui_page.receive.campaigns.created'));
            })
        );
    }

    private get update$() {
        return this.service.update(this.editId, this.getFormValue).pipe(
            tap(() => {
                this.modal3Ref.close(null, Modal3CloseEventEnum.Update);
                this.toastr.successes(this.translate.instant('leads_ui_page.receive.campaigns.edited'));
            }),
            catchError((err) => {
                this.toastr.response(ToastrBarEventEnum.ExceptionUpdated, CAMPAIGN_TRANSLATE_SCHEMA);
                return throwError(err);
            })
        );
    }

    private get getFormValue(): LeadsReceiveCampaignViewModel {
        const formValue = this.form.getRawValue();
        return {
            ...formValue,
            validations: this.formatValidations(formValue.validations)
        };
    }

    private get delete$() {
        return this.service.delete(this.editId).pipe(
            tap(() => {
                this.modal3Ref.close(null, Modal3CloseEventEnum.Delete);
                this.toastr.successes(this.translate.instant('leads_ui_page.receive.campaigns.deleted'));
            }),
            catchError((err) => {
                this.toastr.response(ToastrBarEventEnum.ExceptionDeleted, CAMPAIGN_TRANSLATE_SCHEMA);
                return throwError(err);
            })
        );
    }
}
