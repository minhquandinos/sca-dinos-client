import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    BaseTargetingLinkBuilderComponent,
    TargetingLinkBuilderEnum,
    TargetingLinkBuilderInputDataModel,
    TargetingLinkBuilderOfferConfigModel,
    TargetingLinkBuilderSmartLinkConfigModel
} from '@scaleo/offer/link-builder/common';
import { Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';

import { TargetingLinkBuilderDefaultService } from './services/targeting-link-builder-default.service';
import { TargetingLinkBuilderFormService } from './services/targeting-link-builder-form.service';
import { TargetingLinkBuilderSmartLinkService } from './services/targeting-link-builder-smart-link.service';

@Component({
    selector: 'app-targeting-link-builder',
    templateUrl: './targeting-link-builder.component.html',
    providers: [
        TargetingLinkBuilderDefaultService,
        TargetingLinkBuilderSmartLinkService,
        TargetingLinkBuilderFormService,
        UnsubscribeService
    ]
})
export class TargetingLinkBuilderComponent extends BaseTargetingLinkBuilderComponent implements OnInit {
    readonly links$ = this.targetingLinkBuilderDefaultService.getLinks$;

    readonly creatives$ = this.targetingLinkBuilderDefaultService.staticCreatives$;

    readonly builderDefaultType$: Observable<boolean> = this.builderType$.pipe(map((type) => type === TargetingLinkBuilderEnum.Default));

    readonly offerId: number;

    readonly affiliateId: number;

    readonly isAffiliateAccess: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private targetingLinkBuilderDefaultService: TargetingLinkBuilderDefaultService,
        private targetingLinkBuilderSmartLinkService: TargetingLinkBuilderSmartLinkService,
        private formService: TargetingLinkBuilderFormService,
        protected readonly modal3Ref: Modal3EditFormRef<any, TargetingLinkBuilderInputDataModel>,
        protected readonly translate: TranslateService
    ) {
        super(modal3Ref, translate);
        this.offerId = this.config?.id || null;
        this.affiliateId = this.config?.affiliateId || null;
        this.isAffiliateAccess = this.config?.isAffiliateAccess || false;

        if (Object.prototype.hasOwnProperty.call(this.config, 'creatives$')) {
            this.creatives$ = (this.config as any)?.creatives$ || EMPTY;
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initForm();
        this.initDataFactory();
        this.initParams();
    }

    private initForm() {
        this.form = this.formBuilder.group({
            a: [this.affiliateId],
            ...this.formFactory,
            sub_ids: this.formBuilder.array([]),
            aff_click_id: null,
            idfa: null,
            gaid: null,
            deep_link: null
        });
        this.formService.setForm(this.form);
    }

    private initDataFactory() {
        if (this.builderType === TargetingLinkBuilderEnum.Default) {
            this.initDefaultData();
        }

        if (this.builderType === TargetingLinkBuilderEnum.SmartLink) {
            this.initSmartLinkData();
        }
    }

    private initParams(): void {
        this.assignValueForLinks();
        this.setFirstAffiliateId().pipe(first()).subscribe();
    }

    private initDefaultData() {
        this.targetingLinkBuilderDefaultService.initData(this.config as TargetingLinkBuilderOfferConfigModel);

        const { defaultLinkId = undefined } = (this.config as TargetingLinkBuilderOfferConfigModel) || {};
        if (defaultLinkId) {
            this.defaultLinkId = defaultLinkId;
            this.formService.form.get('link_id').patchValue(defaultLinkId);
        }
    }

    private initSmartLinkData() {
        this.targetingLinkBuilderSmartLinkService.initData(this.config as TargetingLinkBuilderSmartLinkConfigModel);
    }

    private get formFactory(): { [key: string]: unknown } {
        if (this.builderType === TargetingLinkBuilderEnum.Default) {
            return this.targetingLinkBuilderDefaultService.formControls;
        }

        if (this.builderType === TargetingLinkBuilderEnum.SmartLink) {
            return this.targetingLinkBuilderSmartLinkService.formControls;
        }

        return null;
    }

    creativesScrollEnd(event: void) {}

    creativeSearch(event: string) {}
}
