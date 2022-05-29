import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { UiTable2ColumnsModel } from '../..';

@Component({
    selector: 'ui-table2-header-col-tooltip',
    templateUrl: './ui-table2-header-col-tooltip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTable2HeaderColTooltipComponent {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() column: UiTable2ColumnsModel;
}
