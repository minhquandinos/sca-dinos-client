import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Host,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Optional,
    Output,
    Renderer2,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '@scaleo/core/classes';
import { ResizeObserverService } from '@scaleo/core/resize-observer/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

export type InputNumericType = 'integer' | 'float';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            useExisting: forwardRef((): any => InputComponent),
            multi: true
        },
        ResizeObserverService,
        UnsubscribeService
    ],
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputComponent extends BaseControlValueAccessor<any> implements OnInit {
    @Input() formControlName: string;

    @Input() label: string;

    @Input() type: 'text' | 'password' | 'number' = 'text';

    @Input() inputText: string;

    @Input() inputTextPosition: 'left' | 'right' = 'right';

    @Input() numeric: InputNumericType;

    @Input() negativeNumeric = false;

    @Input() transformPattern: RegExp;

    @Input() placeholder = '';

    @Input() disabled = false;

    @Input() size: 'small' | 'base' | 'medium' | 'big' = 'base';

    @Input() positionLabelRequired: 'left' | 'right' = 'right';

    @Input() maxLength: number;

    @Input() autocomplete = false;

    @Input() hideValidationMessage: boolean;

    @Input() labelTooltip: string;

    @Output() changed: EventEmitter<string | number> = new EventEmitter<string | number>();

    @HostBinding('attr.formControlName') customDirective: any;

    public inputStatus: boolean;

    @ViewChild('elementRef', { static: true }) public elementRef: ElementRef;

    @ViewChild('inputTextRef') private readonly inputTextRef: ElementRef;

    @ViewChild('inputContainerRef', { static: true }) private readonly inputContainerRef: ElementRef;

    public required: boolean;

    public control: AbstractControl;

    @HostListener('input', ['$event.target.value'])
    onInput(value: any) {
        let newValue = value;
        if (this.numeric || this.transformPattern) {
            newValue = this.transformValueByPattern(value);
        }
        this.onChange(newValue);
        Promise.resolve().then(() => {
            this.changed.emit(newValue);
        });
    }

    @HostListener('focusin', ['$event'])
    inputFocus() {
        if (this.inputText) {
            this.renderer2.addClass(this.inputContainerRef.nativeElement, 'input-group-custom--focus');
        }
    }

    @HostListener('focusout', ['$event'])
    inputFocusOut() {
        this.renderer2.removeClass(this.inputContainerRef.nativeElement, 'input-group-custom--focus');
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: any) {
        if (this.numeric) {
            this.onlyNumbers(event);
        }
    }

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
        this.renderer2.addClass(this.elementRef.nativeElement, `field-text-size-${this.size}`);
        if (this.maxLength) {
            this.renderer2.setAttribute(this.elementRef.nativeElement, 'maxLength', this.maxLength.toString());
        }
    }

    setDisabledState(disabled: boolean): void {
        if (disabled) {
            this.disabled = disabled;
            this.renderer2.setAttribute(this.elementRef.nativeElement, 'disabled', String(!disabled));
        } else {
            this.renderer2.removeAttribute(this.elementRef.nativeElement, 'disabled');
        }
    }

    writeValue(value: string | number): void {
        this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
    }

    private transformValueByPattern(value: string): string {
        if (this.numeric) {
            value = this.numericTransform(value);
        }

        if (this.transformPattern) {
            value = value.replace(this.transformPattern, '');
        }

        this.renderer2.setProperty(this.elementRef.nativeElement, 'value', value);
        return value;
    }

    onlyNumbers(event: KeyboardEvent) {
        const specialKeys: string[] = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];

        if (specialKeys.indexOf(event.key) !== -1) {
            return;
        }

        const current: string = this.elementRef.nativeElement.value;
        let next: string = current.concat(event.key);
        if (this.negativeNumeric) {
            next = event.key === '-' ? event.key.concat(current) : current.concat(event.key);

            if (event.key === '-') {
                if (!current[0] || typeof current[0] === 'number') {
                    return;
                }
            }
        }

        if (next && !String(next).match(this.numberPattern)) {
            event.preventDefault();
        }
    }

    private numericTransform(value: string): string {
        let pattern: RegExp;
        if (this.numeric === 'integer') {
            pattern = /[^-?0-9]+/g;
        }

        if (this.numeric === 'float') {
            pattern = /[^0-9.-]/g;
        }

        value = value.replace(pattern, '');
        if (this.negativeNumeric) {
            value = value.replace(/(?!^)-/g, '');
        }

        return value;
    }

    private get numberPattern(): RegExp {
        const patterns: { [key: string]: RegExp } = {
            float: /^[0-9.]+(\.[0-9]*){0,1}$/g,
            integer: /^[0-9]*$/g,
            floatNegative: /^-?[0-9]+(\.[0-9]*){0,1}$/g,
            integerNegative: /^-?[0-9]*$/g
        };

        let patternKey: string = this.numeric;
        if (this.negativeNumeric) {
            if (this.numeric === 'float') {
                patternKey = 'floatNegative';
            }

            if (this.numeric === 'integer') {
                patternKey = 'integerNegative';
            }
        }
        return new RegExp(patterns[patternKey]);
    }
}
