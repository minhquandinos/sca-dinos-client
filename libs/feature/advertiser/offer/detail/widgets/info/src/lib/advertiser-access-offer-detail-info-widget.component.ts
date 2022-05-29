import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AdvertiserAccessOfferViewModel } from '@scaleo/feature/advertiser/offer/detail/data-access';
import { OfferUrlsInterface, OfferUrlsTypesEnum } from '@scaleo/offer/common';
import { ArrayUtil } from '@scaleo/utils';

@Component({
    selector: 'scaleo-advertiser-access-offer-detail-info-widget',
    templateUrl: './advertiser-access-offer-detail-info-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertiserAccessOfferDetailInfoWidgetComponent implements OnChanges {
    @Input() offerData: AdvertiserAccessOfferViewModel;

    readonly textLimit = 190;

    previewLink: string;

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        const { offerData } = changes;

        if (offerData?.currentValue) {
            this.findPreviewLink(offerData.currentValue?.links);
        }
    }

    findPreviewLink(links: OfferUrlsInterface[]): void {
        if (links.length > 0) {
            const { url, preview } = ArrayUtil.findByKey(links, 'type', OfferUrlsTypesEnum.Default);
            this.previewLink = preview || url;
        }
    }

    preview(): void {
        if (this.previewLink) {
            window.open(this.previewLink, '_blank');
        }
    }
}
