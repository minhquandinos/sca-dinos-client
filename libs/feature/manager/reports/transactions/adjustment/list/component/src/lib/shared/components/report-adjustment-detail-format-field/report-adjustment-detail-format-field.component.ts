import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-report-adjustment-detail-format-field',
    templateUrl: './report-adjustment-detail-format-field.component.html'
})
export class ReportAdjustmentDetailFormatFieldComponent {
    @Input() key: string;

    @Input() item: any;

    @Input() pathTranslate = 'detail';

    constructor() {}
}
