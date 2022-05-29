import { Component, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';

import { OtherOffersService } from './other-offers.service';

@Component({
    selector: 'app-other-offers',
    templateUrl: './other-offers.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class OtherOffersComponent {
    constructor(private parentForm: FormGroupDirective, private otherOffersService: OtherOffersService) {}

    private get getOtherOffersFormArray(): FormArray {
        return this.parentForm.form.get('other_offers') as FormArray;
    }

    public get getOtherOffersFormControlsArray(): FormGroup[] {
        return this.getOtherOffersFormArray.controls as FormGroup[];
    }

    public add() {
        this.getOtherOffersFormArray.push(this.otherOffersService.addOffer());
    }
}
