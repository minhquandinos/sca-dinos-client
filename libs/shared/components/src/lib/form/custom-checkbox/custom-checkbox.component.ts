import { Component, ElementRef, forwardRef, Host, Input, OnInit, Optional, Renderer2, SkipSelf, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { BaseControlValueAccessor } from '@scaleo/core/classes';

@Component({
    selector: 'app-custom-checkbox',
    templateUrl: './custom-checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef((): any => CustomCheckboxComponent),
            multi: true
        }
    ]
})
export class CustomCheckboxComponent extends BaseControlValueAccessor<any> implements OnInit, ControlValueAccessor {
    @Input() className: string;

    @Input() label: string;

    @Input() formControlName: string;

    @Input() checkboxId: string;

    @Input() inputValue: string | number | boolean = 1;

    @Input() uncheckedValue: string | number | boolean = 0;

    @Input() link: string;

    @Input() linkLabel: string;

    @Input() placeholder: string;

    @Input() set checked(value: boolean) {
        this.inputChecked = value;
    }

    private _value$: BehaviorSubject<string | number | boolean> = new BehaviorSubject(null);

    readonly value$ = this._value$.asObservable();

    public control: AbstractControl;

    public required: boolean;

    public inputChecked = false;

    @ViewChild('checkboxRef') checkboxRef: ElementRef;

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private renderer2: Renderer2) {
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

    public writeValue(value: any) {
        if (this.inputValue === value) {
            this.inputChecked = true;
        }
        this.changeValue(value);
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    // eslint-disable-next-line
    public registerOnTouched(fn: () => void): void {}

    public onChange(event: any) {
        const newValue = event.target.checked ? this.inputValue : this.uncheckedValue;
        this.changeValue(newValue);
        this.propagateChange(newValue);
        this.inputChecked = event.target.checked;
        this.renderer2.setAttribute(this.checkboxRef.nativeElement, 'checked', event.target.checked);
    }

    // eslint-disable-next-line
    private propagateChange: any = () => {};

    changeValue(value: string | number | boolean): void {
        this._value$.next(value);
    }
}
