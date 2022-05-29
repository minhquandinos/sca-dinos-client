import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { Util } from '@scaleo/utils';

@Component({
    selector: 'app-manager-list',
    templateUrl: './manager-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerListComponent implements OnChanges {
    @Input() managers!: ShortManagerModel[] | any[];

    @Input() showAll!: boolean;

    @Input() className = 'table__box';

    managersAll: ShortManagerModel[] | any[] = [];

    endIndex: number;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges) {
        const { managers } = changes;

        if (managers?.currentValue?.length) {
            this.managersAll = (managers?.currentValue as ShortManagerModel[]).filter((manager) => {
                return Util.isNotEmpty(manager);
            });
            this.setEndIndexForSlicePipe(this.managersAll);
            this.cdr.markForCheck();
        }
    }

    trackByFn(index: number, item: ShortManagerModel) {
        return item?.email || index;
    }

    private setEndIndexForSlicePipe(managers: ShortManagerModel[]): void {
        const endIndex = managers.length > 2 ? 2 : managers.length;
        this.endIndex = this.showAll ? managers.length : endIndex;
    }
}
