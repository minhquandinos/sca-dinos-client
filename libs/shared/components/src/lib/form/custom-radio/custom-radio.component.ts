import { Component, EventEmitter, forwardRef, Host, HostBinding, Input, OnInit, Optional, Output, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '@scaleo/core/classes';

@Component({
    selector: 'app-custom-radio',
    templateUrl: './custom-radio.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            useExisting: forwardRef((): any => CustomRadioComponent),
            multi: true
        }
    ]
})
export class CustomRadioComponent extends BaseControlValueAccessor<any> implements OnInit {
    @HostBinding('class') get hostClass() {
        return 'custom-radio';
    }

    @Input() formControlName: string;

    @Input() label: string;

    @Input() items: any[];

    @Input() itemLabel: string;

    @Input() notShowLabel: boolean;

    @Input() trackByKey: string;

    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    public control: AbstractControl;

    public required: boolean;

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
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

    writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private propagateChange: any = () => {};

    public onChange(value: any): void {
        if (this.formControlName) {
            this.value = value;
            this.propagateChange(this.value);
        }
    }

    public trackByFn(item: any): void {
        return this.trackByKey ? item[this.trackByKey] : item;
    }
}
