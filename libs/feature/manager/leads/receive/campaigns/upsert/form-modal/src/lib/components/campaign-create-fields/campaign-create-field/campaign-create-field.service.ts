import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CampaignFieldTypeEnum, LeadsReceiveCampaignFieldModel } from '@scaleo/feature/manager/leads/receive/common';

@Injectable()
export class CampaignCreateFieldService {
    constructor(private formBuilder: FormBuilder) {}

    public addField(field?: LeadsReceiveCampaignFieldModel, type?: CampaignFieldTypeEnum): FormGroup {
        return this.formBuilder.group({
            name: [field?.name || null, Validators.required],
            value: field?.value || '',
            type: field?.type || type
        });
    }
}
