import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { map } from 'rxjs/operators';

import { UiTable2HeaderSelectAllStatusEnum } from '../..';
import { UiTable2ColumnSelectService } from '../../services/ui-table2-column-select.service';

@Component({
    selector: 'ui-table2-header-col-select',
    templateUrl: './ui-table2-header-col-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTable2HeaderColSelectComponent {
    @HostBinding('class') hostClass = 'd-contents';

    checked$ = this.selectService.selectedAll$.pipe(map((status) => status === UiTable2HeaderSelectAllStatusEnum.Checked));

    constructor(private selectService: UiTable2ColumnSelectService) {}

    select() {
        const status =
            this.selectService.selectedAll === UiTable2HeaderSelectAllStatusEnum.Unchecked || this.selectService.selectedAll === null
                ? UiTable2HeaderSelectAllStatusEnum.Checked
                : UiTable2HeaderSelectAllStatusEnum.Unchecked;
        this.selectService.setSelectedAll(status);
    }
}
