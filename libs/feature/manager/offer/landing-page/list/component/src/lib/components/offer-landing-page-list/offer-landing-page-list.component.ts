import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { WindowRefService } from '@scaleo/core/window-ref/service';
import { OfferLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/list/data-access';
import { OfferUrlsTypeIdEnum } from '@scaleo/platform/list/access-data';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-offer-landing-page-list',
    templateUrl: './offer-landing-page-list.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class OfferLandingPageListComponent {
    @Input() items: OfferLandingPageModel[] = [];

    @Input() loading: boolean;

    @Output() openEditForm: EventEmitter<number> = new EventEmitter<number>();

    readonly columns: UiTable2ColumnsModel[] = [
        {
            value: 'title',
            translate: 'table.column.title',
            colWidth: '25%'
        },
        {
            value: 'type',
            translate: 'table.column.type',
            colWidth: '12%'
        },
        {
            value: 'url',
            translate: 'table.column.url',
            colWidth: '35%'
        },
        {
            value: 'preview',
            translate: 'interface.basic.preview_url',
            colWidth: '10rem'
        },
        {
            value: 'visible_to_specific_affiliates_only',
            translate: 'offers_page.urls.visible_to_affiliates',
            colWidth: '70px'
        },
        {
            value: 'targeting',
            translate: 'table.column.targeting',
            colWidth: '15%'
        }
    ];

    readonly offerUrlsTypeIdEnum = OfferUrlsTypeIdEnum;

    constructor(private readonly window: WindowRefService) {}

    edit(id: number): void {
        this.openEditForm.emit(id);
    }

    toPreview(url: string): void {
        this.window.nativeWindow.open(url, '_blank');
    }
}
