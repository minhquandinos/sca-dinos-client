import { Component, Input, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';

import { CampaignFieldTypeEnum } from '@scaleo/feature/manager/leads/receive/common';
import { PlatformListsFormatModel } from '@scaleo/platform/list/access-data';

import { CampaignCreateFieldService } from '../campaign-create-field/campaign-create-field.service';

@Component({
    selector: 'app-campaign-create-fields-group',
    templateUrl: './campaign-create-fields-group.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class CampaignCreateFieldsGroupComponent {
    @Input() fields: PlatformListsFormatModel[];

    @Input() fieldType: CampaignFieldTypeEnum;

    constructor(private parentForm: FormGroupDirective, private campaignCreateFieldService: CampaignCreateFieldService) {}

    private get fieldsFormArray(): FormArray {
        return this.parentForm.form.get('fields') as FormArray;
    }

    get fieldsFormControlsArray(): AbstractControl[] {
        return this.fieldsFormArray.controls.filter((field) => field.value.type === this.fieldType);
    }

    public add() {
        this.fieldsFormArray.push(this.addField());
    }

    private addField(): FormGroup {
        return this.campaignCreateFieldService.addField(null, this.fieldType);
    }
}
