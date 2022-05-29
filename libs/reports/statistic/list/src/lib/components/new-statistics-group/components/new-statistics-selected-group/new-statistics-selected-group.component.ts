import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { BreakdownEnum, NewStatisticBreakdownStateModel } from '@scaleo/reports/statistic/common';

@Component({
    selector: 'app-new-statistics-selected-group',
    templateUrl: './new-statistics-selected-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewStatisticsSelectedGroupComponent {
    @Input() selectedBreakdowns: NewStatisticBreakdownStateModel[] = [];

    @Output() remove: EventEmitter<BreakdownEnum> = new EventEmitter<BreakdownEnum>();

    @HostBinding('class') hostClass = 'text-nowrap d-flex overflow-x-auto mt-1 w-100 flex-md-wrap flex-lg-nowrap';

    removeHandler(breakdown: BreakdownEnum) {
        this.remove.emit(breakdown);
    }
}
