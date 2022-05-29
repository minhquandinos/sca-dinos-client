import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
    OfferCustomParametersConditionsModel,
    OfferCustomParametersParametersModel
} from '@scaleo/feature/manager/offer/custom-param/common';
import { CustomParamsTypesIdEnum } from '@scaleo/platform/list/access-data';

@Injectable()
export class OfferCustomAddFieldUtil {
    constructor(private readonly formBuilder: FormBuilder) {}

    addParameter(param?: OfferCustomParametersParametersModel): FormGroup {
        return this.formBuilder.group({
            type: [param?.type || null, Validators.required],
            cap_type: [param?.cap_type || null],
            goal_id: [param?.goal_id || ''],
            parameter: [param?.parameter || '', Validators.required]
        });
    }

    addCondition(param?: OfferCustomParametersConditionsModel): FormGroup {
        return this.formBuilder.group({
            type: [param?.type || null, Validators.required],
            permission: [param?.permission || CustomParamsTypesIdEnum.Include, Validators.required],
            conditions: [param?.conditions || '', Validators.required]
        });
    }
}
