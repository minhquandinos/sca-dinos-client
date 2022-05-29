import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { MANAGER_ENTITY_DETAIL_TOKEN } from '@scaleo/feature/manager/common/entity-detail';
import { OfferDetailQuery, OfferDetailService } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferConfigCountsModel } from '@scaleo/offer/common';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@Component({
    selector: 'scaleo-manager-offer-config-layout',
    templateUrl: './offer-config-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        UnsubscribeService,
        {
            provide: MANAGER_ENTITY_DETAIL_TOKEN,
            useFactory: (route: ActivatedRoute) => {
                return route?.parent?.parent?.parent?.snapshot?.params?.id;
            },
            deps: [ActivatedRoute]
        }
    ]
})
export class OfferConfigLayoutComponent implements OnInit {
    counts$: Observable<OfferConfigCountsModel> = this.offerDetailQuery.select('counts');

    constructor(
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly offerDetailService: OfferDetailService,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.offerDetailService.counts().pipe(takeUntil(this.unsubscribe)).subscribe();
        this.offerDetailService.setBaseDetailState().pipe(takeUntil(this.unsubscribe)).subscribe();
    }
}
