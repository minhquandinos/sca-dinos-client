import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-validation-message2',
    templateUrl: './validation-message2.component.html'
})
export class ValidationMessage2Component implements OnChanges {
    @Input() validation: any;

    public validationType: string;

    ngOnChanges(changes: SimpleChanges): void {
        const { validation } = changes;

        if (validation && validation.currentValue) {
            this.validationType = Object.keys(this.validation).length > 0 ? Object.keys(this.validation)[0] : null;
        }
    }
}
