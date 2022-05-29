import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { OfferCustomParamListModel } from '@scaleo/feature/manager/offer/custom-param/common';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-offer-custom-params-list',
    templateUrl: './offer-custom-params-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCustomParamsListComponent {
    @Input() items: OfferCustomParamListModel[] = [];

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
                value: 'affiliates',
                translate: 'table.column.affiliates',
                colWidth: '22%'
            },
            {
                value: 'conditions',
                translate: 'table.column.conditions',
                colWidth: '23%'
            },
            {
                value: 'custom_parameters',
                translate: 'table.column.custom_parameters',
                colWidth: '20%'
            },
            {
                value: 'effective_dates',
                translate: 'table.column.effective_dates',
                colWidth: '15%'
            },
            {
                value: 'added_date',
                translate: 'table.column.added_date',
                colWidth: '15%'
            }
        ];
    }
}
