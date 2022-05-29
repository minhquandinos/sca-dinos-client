import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { ReportEnum, StatisticModel } from '@scaleo/reports/common';
import { AdditionalFieldTemplateInterface } from '@scaleo/reports/shared/format-fields';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-report-statistics-table-totals',
    templateUrl: './report-statistics-table-totals.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportStatisticsTableTotalsComponent {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() columns: UiTable2ColumnsModel[] = [];

    @Input() reportType: ReportEnum;

    @Input() item: StatisticModel;

    @Input() currency: CurrencyEnum;

    @Input()
    additionalItemTemplateCollection: AdditionalFieldTemplateInterface[];
}
