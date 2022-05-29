import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';

import { OfferDetailQuery, OfferDetailService } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferDetailViewModel } from '@scaleo/feature/manager/offer/detail/widget/data-access';
import { OfferTrafficDistributionComponent } from '@scaleo/feature/manager/offer/traffic-distribution/widget/component';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@Component({
    selector: 'scaleo-manager-offer-detail-container',
    templateUrl: './offer-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferDetailComponent {
    readonly id$ = this.offerDetailQuery.id$;

    readonly previewLink$ = this.offerDetailQuery.defaultLandingPagePreviewLink$;

    constructor(
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly offerDetailService: OfferDetailService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    @ViewChild(OfferTrafficDistributionComponent)
    private readonly offerTrafficDistribution: OfferTrafficDistributionComponent;

    landingPageUpdate() {
        this.offerTrafficDistribution.reloadDistribution();
    }

    setOfferData(data: OfferDetailViewModel) {
        this.offerDetailService.setCurrency(data?.currency.code);
        this.offerDetailService.setTitle(data?.title);
    }
}
