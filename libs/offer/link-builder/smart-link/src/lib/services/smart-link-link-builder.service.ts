import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { TargetingLinkBuilderSmartLinkConfigModel } from '@scaleo/offer/link-builder/common';

import { SmartLinkLinkBuilderFormService } from './smart-link-link-builder-form.service';

@Injectable()
export class SmartLinkLinkBuilderService {
    constructor(
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private formService: SmartLinkLinkBuilderFormService
    ) {}

    get formControls(): { [key: string]: any } {
        return {
            s: [undefined, Validators.required]
        };
    }

    initData(config: TargetingLinkBuilderSmartLinkConfigModel) {
        this.updateSmartLinkControl(config.id);
    }

    private updateSmartLinkControl(id: number) {
        if (id) {
            this.formService.form.get('s').patchValue(id);
            this.formService.form.get('s').disable();
        }
    }
}
