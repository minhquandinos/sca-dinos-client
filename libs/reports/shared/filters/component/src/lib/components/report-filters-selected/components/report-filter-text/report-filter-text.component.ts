import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    SkipSelf
} from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';

@DynamicComponentLookup('ReportFilterTextComponent')
@Component({
    selector: 'app-report-filter-text',
    templateUrl: './report-filter-text.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFilterTextComponent implements OnInit, AfterViewInit {
    @HostBinding('class') hostClass = 'd-block report-filters-text';

    @Input() formName: string = null;

    @Output() initialSelected: EventEmitter<string> = new EventEmitter<string>();

    form: FormGroup;

    constructor(private controlContainer: ControlContainer) {}

    ngOnInit(): void {
        this.form = this.controlContainer.control as FormGroup;
    }

    ngAfterViewInit(): void {
        Promise.resolve().then(() => {
            this.initialSelected.emit(this.form.get(this.formName).value);
        });
    }
}
