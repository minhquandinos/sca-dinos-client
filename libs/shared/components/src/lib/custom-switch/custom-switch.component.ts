import {
    Component,
    EventEmitter,
    forwardRef,
    Host,
    HostBinding,
    Input,
    OnInit,
    Optional,
    Output,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UiSwitchComponent } from 'ngx-ui-switch';

import { BaseControlValueAccessor } from '@scaleo/core/classes';

@Component({
    selector: 'app-custom-switch',
    templateUrl: './custom-switch.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            useExisting: forwardRef((): any => CustomSwitchComponent),
            multi: true
        }
    ]
})
export class CustomSwitchComponent extends BaseControlValueAccessor<any> implements OnInit {
    @HostBinding('class') get hostClass() {
        return `custom-switch ${this.className}`;
    }

    @Input() formControlName: string;

    @Input() label: string;

    @Input() sizeSwitch = 'small';

    @Input() enableValue: any;

    @Input() disabledValue: any;

    @Input() className = '';

    @Input() set checked(value: boolean) {
        this.check = value;
    }

    @Input() set inlineSwitch(value: boolean) {
        if (value) {
            this.className += `${this.className} custom-switch--inline`;
        }
    }

    @Input() disabled: boolean;

    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild(UiSwitchComponent) public readonly uiSwitchComponent: UiSwitchComponent;

    public control: AbstractControl;

    public required: boolean;

    check = false;

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

    writeValue(value: string | number): void {
        this.value = value;
        this.checkChecked();
    }

    change(event: unknown) {
        let value;
        if (this.enableValue && this.disabledValue) {
            value = event ? this.enableValue : this.disabledValue;
        } else {
            value = event ? 1 : 0;
        }
        this.onChange(value);
        this.toggle.emit(Boolean(value));
        this.checkChecked();
    }

    private checkChecked() {
        if (this.enableValue && this.disabledValue) {
            const enableValue = typeof +this.enableValue === 'number' ? +this.enableValue : this.enableValue;
            this.check = this.control ? this.control.value === enableValue : false;
        } else {
            this.check = this.control ? this.control.value === 1 : false;
        }
    }
}
