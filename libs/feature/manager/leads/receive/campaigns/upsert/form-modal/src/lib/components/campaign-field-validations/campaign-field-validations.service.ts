import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CampaignFieldValidationsModel } from '@scaleo/feature-manager-leads-receive-campaigns-upsert-data-access';

@Injectable()
export class CampaignFieldValidationsService {
    constructor(private formBuilder: FormBuilder) {}

    public addValidation(validation?: CampaignFieldValidationsModel): FormGroup {
        return this.formBuilder.group({
            name: [validation?.name || null, Validators.required],
            type: [validation?.type || null, Validators.required],
            value: [validation?.value || null, Validators.required]
        });
    }
}
