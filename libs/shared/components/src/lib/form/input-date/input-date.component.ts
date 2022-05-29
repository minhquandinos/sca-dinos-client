import { AfterViewInit, Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormFieldComponent } from '@scaleo/core/classes';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

@Component({
    selector: 'app-input-date',
    templateUrl: './input-date.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef((): any => InputDateComponent),
            multi: true
        }
    ]
})
export class InputDateComponent extends BaseFormFieldComponent implements OnInit, AfterViewInit {
    @Input() featuresDate: boolean;

    @Input() autoUpdateInput = true;

    @Output() toggle: EventEmitter<CustomDateRangeModel> = new EventEmitter<CustomDateRangeModel>();

    constructor(
        @Optional() @Host() @SkipSelf() protected readonly controlContainer: ControlContainer,
        private readonly customDateRangeService: CustomDateRangeService
    ) {
        super(controlContainer);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        if (this.control?.value === null && this.autoUpdateInput) {
            Promise.resolve().then(() => {
                this.onChange(this.customDateRangeService.rangeTo);
            });
        }
    }

    onChangeDate(event: CustomDateRangeModel): void {
        this.onChange(event.rangeFrom);
        this.toggle.emit(event);
        this.value = event.rangeFrom;
    }
}
