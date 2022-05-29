import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';

@Component({
    selector: 'scaleo-offer-custom-url-old-widget',
    templateUrl: './offer-profile-custom-url.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferProfileCustomUrlComponent implements OnInit {
    @Input() url: string;

    @Input() offerId: number;

    @Input() userId: number;

    customUrl: string;

    constructor(private shared: SharedMethodsService) {}

    ngOnInit(): void {
        this.prepareUrl();
    }

    copy() {
        return (): any => this.shared.copyToMemory(this.customUrl, 'interface.basic.link_copy');
    }

    private prepareUrl(): void {
        if (this.url) {
            this.customUrl = this.url.replace('{affiliate_id}', this.userId.toString()).replace('{offer_id}', this.offerId.toString());
        }
    }
}
