import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    forwardRef,
    Host,
    HostBinding,
    Input,
    OnInit,
    Optional,
    QueryList,
    SkipSelf
} from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseControlValueAccessor } from '@scaleo/core/classes';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { RadioComponent } from './radio.component';

@Component({
    selector: 'app-radio-group',
    templateUrl: './radio-group.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef((): any => RadioGroupComponent),
            multi: true
        }
    ]
})
export class RadioGroupComponent extends BaseControlValueAccessor<any> implements OnInit, AfterViewInit {
    @Input() label: string;

    @Input() formControlName: string;

    @Input() inputValue = '';

    @Input() alignment: 'row' | 'column' = 'row';

    public control: AbstractControl;

    public required: boolean;

    @ContentChildren(forwardRef((): any => RadioComponent)) radios: QueryList<RadioComponent>;

    @HostBinding('class') hostClass = 'radio-group';

    constructor(
        @Optional() @Host() @SkipSelf() private readonly controlContainer: ControlContainer,
        private cdr: ChangeDetectorRef,
        private unsubscribe: UnsubscribeService
    ) {
        super();
    }

    ngOnInit(): void {
        // TODO move to abstract class, refactor all components
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

    ngAfterViewInit(): void {
        this.radios.changes.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            this.updateRadioChangeHandler();
        });

        this.updateRadioChangeHandler();
        this.setValueForRadio();
    }

    protected updateRadioChangeHandler() {
        this.radios.forEach((radio) => {
            radio.registerRadioChangeHandler((event: any) => {
                this.emitChangeEvent(event);
            });
        });
    }

    private setValueForRadio() {
        this.radios.forEach((radio) => {
            radio.formControlName = this.formControlName;
            radio.writeValue(this.control.value);
            radio.setDisabledState(this.control?.disabled || radio?.disabled);
        });
    }

    setDisabledState(isDisabled: boolean) {
        if (this.radios) {
            this.radios.forEach((radio) => {
                radio.setDisabledState(isDisabled);
            });
        }
    }

    emitChangeEvent(event: any) {
        if (this.formControlName) {
            this.onChange(event);
            this.value = event;
        }
    }
}
