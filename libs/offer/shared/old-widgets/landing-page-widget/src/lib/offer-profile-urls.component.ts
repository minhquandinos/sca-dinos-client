import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { WindowRefService } from '@scaleo/core/window-ref/service';
import { OfferLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/list/data-access';
import { OfferUrlsTypeIdEnum } from '@scaleo/platform/list/access-data';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-offer-landing-page-old-widget',
    templateUrl: './offer-profile-urls.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class OfferProfileUrlsComponent {
    @Input() set urls(urls: OfferLandingPageModel[]) {
        if (urls) {
            this.countUrls = urls.length;
            this.urlsList = this.limit ? urls.slice(0, this.limit) : urls;
        }
    }

    @Input() limit: number;

    @Output() updated: EventEmitter<void> = new EventEmitter<void>();

    urlsList: OfferLandingPageModel[];

    readonly offerUrlsTypeIdEnum = OfferUrlsTypeIdEnum;

    readonly tableHeadersForUrls: UiTableHeaderInterface[] = [
        {
            value: 'title',
            key: 'title',
            translateKey: 'table.column.title',
            colWidth: '30%'
        },
        {
            value: 'type',
            key: 'type',
            translateKey: 'table.column.type',
            colWidth: '15%'
        },
        {
            value: 'url',
            key: 'url',
            translateKey: 'table.column.url',
            colWidth: '35%'
        },
        {
            value: 'preview',
            key: 'preview',
            translateKey: 'interface.basic.preview',
            colWidth: '20%'
        }
    ];

    countUrls: number;

    constructor(private readonly window: WindowRefService) {}

    toPreview(url: string): void {
        this.window.nativeWindow.open(url, '_blank');
    }
}
