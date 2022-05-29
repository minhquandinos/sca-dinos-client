import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { BreakdownEnum, NewStatisticBreakdownStateModel, NewStatisticsGroupModel } from '@scaleo/reports/statistic/common';

import { NewReportStatisticsBreakdownService } from '../../../../state';

@Component({
    selector: 'app-new-statistics-group',
    templateUrl: './new-statistics-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewStatisticsGroupComponent {
    @HostBinding('class') hostClass = 'statistics-group';

    @Output() remove: EventEmitter<BreakdownEnum> = new EventEmitter<BreakdownEnum>();

    @Output() add: EventEmitter<BreakdownEnum> = new EventEmitter<BreakdownEnum>();

    @Output() list: EventEmitter<NewStatisticBreakdownStateModel[]> = new EventEmitter<NewStatisticBreakdownStateModel[]>();

    breakdownsList$: Observable<NewStatisticsGroupModel[]> = this.breakdownService.get().pipe(share());

    selectedBreakdowns$ = this.breakdownService.breakdowns$;

    constructor(private breakdownService: NewReportStatisticsBreakdownService) {}

    removeBreakdown(breakdown: BreakdownEnum) {
        this.breakdownService.remove(breakdown);
        this.remove.emit(breakdown);
    }

    addBreakdown(breakdown: BreakdownEnum) {
        this.breakdownService.add(breakdown);
        this.add.emit(breakdown);
        this.list.emit(this.breakdownService.breakdowns);
    }
}
