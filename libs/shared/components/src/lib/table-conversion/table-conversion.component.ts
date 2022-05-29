import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { TableConversionLiveStatsModel } from './table-conversion.model';

@Component({
    selector: 'app-table-conversion',
    templateUrl: './table-conversion.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableConversionComponent {
    @Input() liveStats: TableConversionLiveStatsModel;

    @HostBinding('class') hostClass = 'd-flex align-items-end justify-content-end w-100 m-r-24';
}
