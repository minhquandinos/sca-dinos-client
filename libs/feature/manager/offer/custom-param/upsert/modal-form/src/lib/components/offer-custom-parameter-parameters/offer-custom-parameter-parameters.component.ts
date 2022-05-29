import { Component, Input, SkipSelf, ViewEncapsulation } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';

import { OfferCustomAddFieldUtil } from '../../utils/offer-custom-add-field.util';

@Component({
    selector: 'app-offer-custom-parameter-parameters',
    templateUrl: './offer-custom-parameter-parameters.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    styleUrls: ['./offer-custom-parameter-parameters.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OfferCustomParameterParametersComponent {
    @Input() formName: string;

    constructor(private readonly parentForm: FormGroupDirective, private readonly offerCustomAddFieldHelper: OfferCustomAddFieldUtil) {}

    get parametersFormArray(): FormArray {
        return this.parentForm.form.get('parameters') as FormArray;
    }

    add() {
        this.parametersFormArray.push(this.field());
    }

    delete(index: number) {
        this.parametersFormArray.removeAt(index);
    }

    field(): FormGroup {
        return this.offerCustomAddFieldHelper.addParameter();
    }
}
