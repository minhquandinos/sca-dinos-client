import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { LeadsReceiveCampaignFieldModel } from '@scaleo/feature/manager/leads/receive/common';
import { CampaignFieldValidationsModel } from '@scaleo/feature-manager-leads-receive-campaigns-upsert-data-access';
import { CampaignFieldValidationTypeEnum } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-campaign-field-validation',
    templateUrl: './campaign-field-validation.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class CampaignFieldValidationComponent implements OnInit {
    @Input() index: number;

    @Input() group: FormGroup;

    @Input() fields: LeadsReceiveCampaignFieldModel[];

    public readonly campaignFieldValidationTypeEnum = CampaignFieldValidationTypeEnum;

    public validationType$: Observable<CampaignFieldValidationTypeEnum>;

    constructor(private parentForm: FormGroupDirective) {}

    ngOnInit(): void {
        this.validationType$ = this.getCurrentValidationType;
    }

    private get validationsFormArray(): FormArray {
        return this.parentForm.form.get('validations') as FormArray;
    }

    public delete(): void {
        this.validationsFormArray.removeAt(this.index);
    }

    public changeType(): void {
        this.group.patchValue({
            value: null
        });
    }

    private get getCurrentValidationType(): Observable<CampaignFieldValidationTypeEnum> {
        return this.group.valueChanges.pipe(
            startWith(this.group.value as CampaignFieldValidationsModel),
            map((field: CampaignFieldValidationsModel) => field.type),
            shareReplay()
        );
    }
}
