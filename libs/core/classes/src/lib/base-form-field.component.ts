import { Component, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';

import { BaseControlValueAccessor } from '@scaleo/core/classes';

@Component({
    template: ''
})
export abstract class BaseFormFieldComponent<T = any> extends BaseControlValueAccessor<any> implements OnInit {
    @Input() formControlName: string;

    @Input() hideValidationMessage: boolean;

    @Input() label: string;

    @Input() placeholder: string;

    required: boolean;

    control: AbstractControl;

    protected constructor(@Optional() @Host() @SkipSelf() protected readonly controlContainer: ControlContainer) {
        super();
    }

    ngOnInit(): void {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);

                if (this.control.validator) {
                    const validator = this.control.validator({} as AbstractControl);
                    if (this.control && validator && validator.required) {
                        this.required = true;
                    }
                }
            }
        }
    }
}
