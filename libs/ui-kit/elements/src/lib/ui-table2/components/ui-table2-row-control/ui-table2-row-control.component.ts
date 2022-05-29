import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'ui-table2-row-control',
    template: `
        <td class="table2__column-control">
            <div class="table2__column d-flex align-items-center justify-content-end">
                <ng-content></ng-content>
            </div>
        </td>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTable2RowControlComponent {
    @HostBinding('class') hostClass = 'd-contents';
}
