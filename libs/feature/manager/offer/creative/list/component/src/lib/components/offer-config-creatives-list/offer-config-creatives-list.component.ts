import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ManagerOfferCreativeModel } from '@scaleo/feature/manager/offer/creative/list/data-access';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-offer-config-creatives-list',
    templateUrl: './offer-config-creatives-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferConfigCreativesListComponent {
    @Input() items: ManagerOfferCreativeModel[] = [];

    @Input() loading: boolean;

    @Output() openEditForm: EventEmitter<number> = new EventEmitter<number>();

    readonly tableHeaders = this.getTableHeaders;

    edit(id: number): void {
        this.openEditForm.emit(id);
    }

    private get getTableHeaders(): UiTable2ColumnsModel[] {
        return [
            {
                value: 'status',
                translate: 'table.column.status',
                colWidth: '5%'
            },
            {
                value: 'title',
                translate: 'table.column.title',
                colWidth: '15%'
            },
            {
                value: 'type',
                translate: 'table.column.type',
                colWidth: '10%'
            },
            {
                value: 'details',
                translate: 'table.column.details',
                colWidth: '15%'
            },
            {
                value: 'offer_url',
                translate: 'table.column.offer_url',
                colWidth: '15%'
            },
            {
                value: 'preview',
                translate: 'table.column.preview'
            },
            {
                value: 'tracking_url',
                translate: 'table.column.tracking_url'
            },
            {
                value: 'html_code',
                translate: 'table.column.html_code'
            },
            {
                value: 'added_date',
                translate: 'table.column.added_date',
                colWidth: '10%'
            }
        ];
    }
}
