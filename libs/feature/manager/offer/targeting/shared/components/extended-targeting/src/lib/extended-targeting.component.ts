import { Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';

import { OfferTargetingRuleModel } from '@scaleo/offer/common';

import { OfferAllowedDeniedIdEnum } from '../../../../../../../../../offer/common/src/lib/offer/offer-allowed-denied.enum';

@Component({
    selector: 'app-extended-targeting',
    templateUrl: './extended-targeting.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class ExtendedTargetingComponent {
    @Input() formArrayName: string;

    constructor(private readonly parentForm: FormGroupDirective, private readonly fb: FormBuilder) {}

    deleteRule(index: number): void {
        (this.parentForm.form.get(this.formArrayName) as FormArray).removeAt(index);
    }

    get targetingRules(): any {
        return (this.parentForm.form.get(this.formArrayName) as FormArray).controls;
    }

    addRule(): void {
        (this.parentForm.form.get(this.formArrayName) as FormArray).push(this.addField());
    }

    addField(targeting?: OfferTargetingRuleModel): any {
        return this.fb.group({
            type: [targeting?.type?.id || null, Validators.required],
            permission: [targeting?.permission.id || OfferAllowedDeniedIdEnum.Allowed, Validators.required],
            conditions: [targeting?.conditions || null, Validators.required]
        });
    }
}
