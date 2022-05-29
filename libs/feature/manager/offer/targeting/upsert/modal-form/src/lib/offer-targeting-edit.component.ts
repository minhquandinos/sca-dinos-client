import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ExtendedTargetingComponent } from '@scaleo/feature/manager/offer/targeting/shared/components/extended-targeting';
import { OFFER_TARGETING_EDIT_PROVIDER, OfferTargetingEditService } from '@scaleo/feature/manager/offer/targeting/upsert/data-access';
import { OfferTargetingGeoModel, OfferTargetingModel } from '@scaleo/offer/common';
import { MultiSelectDataConfigModel } from '@scaleo/shared/components2/multi-select-block';
import { ShortEntityNameEnum } from '@scaleo/shared/data-access/short-entity-list';
import { Modal3CloseEventEnum, Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-offer-targeting-edit',
    templateUrl: './offer-targeting-edit.component.html',
    providers: [OFFER_TARGETING_EDIT_PROVIDER]
})
export class OfferTargetingEditComponent implements OnInit {
    form: FormGroup;

    readonly multiSelectDataConfig: MultiSelectDataConfigModel = {
        serviceName: ShortEntityNameEnum.GeoNames,
        queryParams: {
            perPage: 20,
            page: 1,
            sortField: 'id',
            sortDirection: 'asc'
        }
    };

    readonly includedIds: OfferTargetingGeoModel[] = [];

    readonly extendedIds: OfferTargetingGeoModel[] = [];

    @ViewChild(ExtendedTargetingComponent, { static: true })
    extendedTargetingComponent: ExtendedTargetingComponent;

    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrBarService,
        private offerTargetingEditService: OfferTargetingEditService,
        private modal3EditFormRef: Modal3EditFormRef<any, OfferTargetingModel>
    ) {
        this.includedIds = modal3EditFormRef.config.data.gt_included_ids;
        this.extendedIds = modal3EditFormRef.config.data.gt_excluded_ids;
    }

    ngOnInit(): void {
        this.initForm();
    }

    public save(): void {
        if (this.form.valid) {
            this.offerTargetingEditService
                .update(this.form.value)
                .toPromise()
                .then(
                    (response) => {
                        this.modal3EditFormRef.close(response, Modal3CloseEventEnum.Update);
                        this.toastr.response(ToastrBarEventEnum.Updated, 'offers_page.targeting.title');
                    },
                    () => {
                        this.toastr.response(ToastrBarEventEnum.ExceptionUpdated, 'offers_page.targeting.title');
                    }
                );
        } else {
            this.form.markAllAsTouched();
        }
    }

    private initForm(): void {
        const { strict_targeting, extended_targeting, gt_included_ids, gt_excluded_ids } = this.modal3EditFormRef.config.data;
        this.form = this.formBuilder.group({
            gt_included_ids: [gt_included_ids.map((elem) => elem.id)],
            gt_excluded_ids: [gt_excluded_ids.map((elem) => elem.id)],
            extended_targeting: this.formBuilder.array([]),
            strict_targeting
        });

        extended_targeting.forEach((field) => {
            const fieldsArray = this.form.get('extended_targeting') as FormArray;
            fieldsArray.push(this.extendedTargetingComponent.addField(field));
        });
    }
}
