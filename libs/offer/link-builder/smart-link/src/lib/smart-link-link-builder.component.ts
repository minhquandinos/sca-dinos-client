import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

import {
    BaseTargetingLinkBuilderComponent,
    TargetingLinkBuilderInputDataModel,
    TargetingLinkBuilderSmartLinkConfigModel
} from '@scaleo/offer/link-builder/common';
import { Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';

import { SmartLinkLinkBuilderService } from './services/smart-link-link-builder.service';
import { SmartLinkLinkBuilderFormService } from './services/smart-link-link-builder-form.service';

@Component({
    selector: 'scaleo-smart-link-link-builder',
    templateUrl: './smart-link-link-builder.component.html',
    providers: [SmartLinkLinkBuilderService, SmartLinkLinkBuilderFormService]
})
export class SmartLinkLinkBuilderComponent extends BaseTargetingLinkBuilderComponent implements OnInit {
    readonly offerId: number;

    constructor(
        private formBuilder: FormBuilder,
        private targetingLinkBuilderSmartLinkService: SmartLinkLinkBuilderService,
        private formService: SmartLinkLinkBuilderFormService,
        protected readonly modal3Ref: Modal3EditFormRef<any, TargetingLinkBuilderInputDataModel<TargetingLinkBuilderSmartLinkConfigModel>>,
        protected readonly translate: TranslateService
    ) {
        super(modal3Ref, translate);
        this.offerId = this.config.id;
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initForm();
        this.initSmartLinkData();
        this.initParams();
    }

    private initForm() {
        this.form = this.formBuilder.group({
            a: [this.affiliateId],
            ...this.targetingLinkBuilderSmartLinkService.formControls,
            sub_ids: this.formBuilder.array([]),
            aff_click_id: null,
            idfa: null,
            gaid: null,
            deep_link: null
        });
        this.formService.setForm(this.form);
    }

    private initSmartLinkData() {
        this.targetingLinkBuilderSmartLinkService.initData(this.config as TargetingLinkBuilderSmartLinkConfigModel);
    }

    private initParams(): void {
        this.assignValueForLinks();
        if (!this.isAffiliateAccess) {
            this.setFirstAffiliateId().pipe(take(1)).subscribe();
        }
    }
}
