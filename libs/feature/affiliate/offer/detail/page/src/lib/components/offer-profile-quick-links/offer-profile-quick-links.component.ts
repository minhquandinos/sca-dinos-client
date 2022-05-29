import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BaseObjectModel } from '@scaleo/core/data';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';

@Component({
    selector: 'scaleo-offer-quick-links-old-widget',
    templateUrl: './offer-profile-quick-links.component.html'
})
export class OfferProfileQuickLinksComponent {
    @Input()
    offerId: number;

    constructor(private readonly router: Router) {}

    toLink(to: 'statistics' | 'conversions' | 'clicks') {
        const urlMap: BaseObjectModel = {
            statistics: '/affiliate/reports/statistics/day',
            conversions: '/affiliate/transactions/conversions',
            clicks: '/affiliate/transactions/clicks'
        };

        const url = urlMap[to];

        if (url) {
            this.router.navigate([url], {
                queryParams: {
                    [ReportFilterFilterEnum.Offer]: this.offerId
                }
            });
        }
    }
}
