import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Host,
    HostBinding,
    Input,
    OnInit,
    Optional,
    Output,
    SkipSelf
} from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '@scaleo/core/classes';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef((): any => RadioComponent),
            multi: true
        }
    ]
})
export class RadioComponent extends BaseControlValueAccessor<any> implements OnInit {
    @HostBinding('class') get hostClass() {
        return 'custom-radio';
    }

    @Input() formControlName: string;

    @Input() label: string;

    @Input() inputValue: any = '';

    @Input() tooltipText: string;

    @Input() disabled: boolean;

    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    public control: AbstractControl;

    public required: boolean;

    id: string | number;

    // eslint-disable-next-line
    radioChangeHandler = (event: any) => {};

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private cdr: ChangeDetectorRef) {
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

        if (this.formControlName) {
            this.id = this.formControlName;
        } else {
            // TODO refactor dynamic id
            this.id = Math.floor(Math.random() * 100);
        }
    }

    writeValue(value: any): void {
        this.value = value;
        this.cdr.detectChanges();
    }

    setDisabledState(disabled: boolean): void {
        super.setDisabledState(disabled);
        this.cdr.detectChanges();
    }

    public checked(value: any) {
        if (this.formControlName) {
            this.value = value;
            this.onChange(value);
            this.onTouched();
        }
    }

    onClick(value: any) {
        this.radioChangeHandler(value);
    }

    registerRadioChangeHandler(fn: (event: any) => void) {
        this.radioChangeHandler = fn;
    }
}
