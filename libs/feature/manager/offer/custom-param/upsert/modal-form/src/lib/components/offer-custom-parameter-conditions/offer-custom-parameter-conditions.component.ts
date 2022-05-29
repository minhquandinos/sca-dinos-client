import { Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';

import { OfferCustomAddFieldUtil } from '../../utils/offer-custom-add-field.util';

@Component({
    selector: 'app-offer-custom-parameter-conditions',
    templateUrl: './offer-custom-parameter-conditions.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class OfferCustomParameterConditionsComponent {
    @Input() formName: string = null;

    constructor(private readonly parentForm: FormGroupDirective, private readonly offerCustomAddFieldHelper: OfferCustomAddFieldUtil) {}

    get conditionsFormArray(): FormArray {
        return this.parentForm.form.get('conditions') as FormArray;
    }

    add() {
        this.conditionsFormArray.push(this.field());
    }

    delete(index: number) {
        this.conditionsFormArray.removeAt(index);
    }

    field(): FormGroup {
        return this.offerCustomAddFieldHelper.addCondition();
    }
}
