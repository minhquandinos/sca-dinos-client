import {
    Component,
    ElementRef,
    forwardRef,
    Host,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Optional,
    Renderer2,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '@scaleo/core/classes';
import { ValidationMethods } from '@scaleo/shared/validators';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef((): any => TextareaComponent),
            multi: true
        }
    ]
})
export class TextareaComponent extends BaseControlValueAccessor<any> implements OnInit {
    @Input() formControlName: string;

    @Input() label: string;

    @Input() placeholder = '';

    @Input() maxLength: string;

    @Input() rows = 1;

    @Input() shouldAutosize = true;

    @HostBinding('attr.autosize') autoSize;

    @ViewChild('elementRef', { static: true }) elementRef: ElementRef;

    public control: AbstractControl;

    public required: boolean;

    @HostListener('input', ['$event.target.value'])
    onInput(value) {
        this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
        this.onChange(value);
    }

    constructor(
        private validation: ValidationMethods,
        @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
        public readonly renderer2: Renderer2
    ) {
        super();
    }

    @HostListener('blur')
    onBlur() {
        this.onTouched();
    }

    ngOnInit(): void {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);
                if (this.control?.validator) {
                    const validator = this.control.validator({} as AbstractControl);
                    if (this.control && validator && validator.required) {
                        this.required = true;
                    }
                }
            }
        }
        if (this.maxLength) {
            this.renderer2.setAttribute(this.elementRef.nativeElement, 'maxLength', this.maxLength);
        }
    }

    writeValue(value: string | number): void {
        if (value !== undefined) {
            this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
        }
    }

    setDisabledState(disabled: boolean): void {
        if (disabled) {
            this.renderer2.setAttribute(this.elementRef.nativeElement, 'disabled', String(!disabled));
        } else {
            this.renderer2.removeAttribute(this.elementRef.nativeElement, 'disabled');
        }
    }
}
