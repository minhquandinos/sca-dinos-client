import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UiTable2ColumnSelectService } from '../../services/ui-table2-column-select.service';

@Component({
    selector: 'ui-table2-col-select',
    templateUrl: './ui-table2-col-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTable2ColSelectComponent {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() item: unknown;

    @Input() selectItemValue: string;

    @Input() index: number;

    checked$: Observable<boolean> = this.selectService.selected$.pipe(
        map((items) => (items === null ? false : items.some((item) => item.position === this.index)))
    );

    constructor(private selectService: UiTable2ColumnSelectService, private cdr: ChangeDetectorRef) {}

    select(updateAll = false) {
        this.selectService.setSelected(
            {
                position: this.index,
                value: this.selectItemValue ? (this.item as any)[this.selectItemValue] : this.item
            },
            updateAll
        );
        this.cdr.detectChanges();
    }
}
