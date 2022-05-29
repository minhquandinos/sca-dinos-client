import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { BreakdownEnum, NewStatisticGroupItemModel, NewStatisticsGroupModel } from '@scaleo/reports/statistic/common';
import { DropdownEntityComponent } from '@scaleo/ui-kit/components/dropdown-entity';
import { EntityListComponent } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-new-statistics-selection-group',
    templateUrl: './new-statistics-selection-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewStatisticsSelectionGroupComponent {
    @Input() breakdownsList: NewStatisticsGroupModel[];

    @Output() selected: EventEmitter<BreakdownEnum> = new EventEmitter<BreakdownEnum>();

    searchValue: string;

    @ViewChild('entityList') entityList: EntityListComponent;

    @ViewChild('dropdownEntity') dropdownEntity: DropdownEntityComponent;

    searchHandler(value: string) {
        this.searchValue = value;
    }

    dropdownStatus(show: boolean) {
        if (!show) {
            this.entityList.customSearchComponent.clear();
        }
    }

    selectHandler(group: NewStatisticGroupItemModel) {
        this.selected.emit(group.key);
        this.dropdownEntity.close();
    }
}
