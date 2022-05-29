import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferAffiliateAccessEditComponent } from '@scaleo/feature/manager/offer/affiliate-access/update/modal-form';
import {
    OFFER_AFFILIATE_ACCESS_PROVIDER,
    OfferAffiliateAccessWidgetQuery,
    OfferAffiliateAccessWidgetService
} from '@scaleo/feature/manager/offer/affiliate-access/widget/data-access';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-manager-offer-affiliate-access',
    templateUrl: './offer-affiliate-access.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OFFER_AFFILIATE_ACCESS_PROVIDER, UnsubscribeService]
})
export class OfferAffiliateAccessComponent implements OnInit {
    readonly visibility$ = this.affiliateAccessWidgetQuery.visibility$;

    readonly allowed$ = this.affiliateAccessWidgetQuery.select('allowed_affiliates');

    readonly denied$ = this.affiliateAccessWidgetQuery.select('denied_affiliates');

    readonly showAskAffiliatesApprovalQuestions$ = this.affiliateAccessWidgetQuery.getShowAskAffiliatesApprovalQuestions$;

    readonly data$ = this.affiliateAccessWidgetQuery.data$;

    constructor(
        private readonly affiliateAccessWidgetService: OfferAffiliateAccessWidgetService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly affiliateAccessWidgetQuery: OfferAffiliateAccessWidgetQuery,
        private readonly modal3: Modal3Service,
        private readonly offerDetailQuery: OfferDetailQuery,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.offerDetailQuery.id$
            .pipe(
                filter((id) => !!id),
                switchMap((id) => this.affiliateAccessWidgetService.index(id)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    editForm() {
        const ref = this.modal3.editForm(OfferAffiliateAccessEditComponent, {
            data: this.affiliateAccessWidgetQuery.getValue()
        });

        ref.afterClosed$
            .pipe(
                tap((event) => {
                    this.affiliateAccessWidgetService.update(event.data);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }
}
