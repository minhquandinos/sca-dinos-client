import { Component, Input } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';

import { OfferGoalCapModel } from '@scaleo/feature/manager/offer/goal/common';

@Component({
    selector: 'app-add-caps2',
    templateUrl: './add-caps2.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: FormGroupDirective
        }
    ]
})
export class AddCaps2Component {
    @Input() set caps(value: OfferGoalCapModel[]) {
        if (value?.length > 0) {
            value.forEach((field) => {
                this.capsArray.push(this.addField(field));
            });
        }
    }

    constructor(private fb: FormBuilder, private parentForm: FormGroupDirective) {}

    public addField(field?: OfferGoalCapModel) {
        return this.fb.group({
            period: [field && field.period ? field.period : '', Validators.required],
            type: [field && field.type ? field.type : '', Validators.required],
            value: [field && field.value ? field.value : '', Validators.required]
        });
    }

    public delete(index: number) {
        (this.parentForm.form.get('caps') as FormArray).removeAt(index);
    }

    public add() {
        (this.parentForm.form.get('caps') as FormArray).push(this.addField());
    }

    public get capsArray(): FormArray {
        return this.parentForm.form.get('caps') as FormArray;
    }
}
