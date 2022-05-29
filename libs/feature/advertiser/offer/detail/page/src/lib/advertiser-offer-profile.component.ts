import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    ADVERTISER_ACCESS_OFFER_DETAIL_PROVIDER,
    AdvertiserAccessOfferDetailQuery,
    AdvertiserAccessOfferDetailService,
    AdvertiserAccessOfferViewModel
} from '@scaleo/feature/advertiser/offer/detail/data-access';
import { AffiliateOfferCreativeModel } from '@scaleo/feature/affiliate/offer/detail/data-access';
import { ExtendedTargetingInterface, GoalOfferModel, OfferViewTargetingModel, TrackingDomainsInterface } from '@scaleo/offer/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-advertiser-offer-profile',
    templateUrl: './advertiser-offer-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ADVERTISER_ACCESS_OFFER_DETAIL_PROVIDER, UnsubscribeService]
})
export class AdvertiserOfferProfileComponent implements OnInit {
    showTargeting: boolean;

    readonly offerId: number;

    readonly creativesHeaders: UiTableHeaderInterface[] = [
        {
            value: 'title',
            key: 'title',
            translateKey: 'table.column.title',
            colWidth: '50%'
        },
        {
            value: 'type',
            key: 'type',
            translateKey: 'table.column.type',
            colWidth: '25%'
        },
        {
            value: 'preview',
            key: 'preview',
            translateKey: 'table.column.preview'
        }
    ];

    userId: number = this.profileQuery.profile.id;

    readonly offerData$ = this.advertiserAccessOfferDetailQuery.select();

    readonly currency$: Observable<CurrencyEnum> = this.advertiserAccessOfferDetailQuery.select('currency');

    readonly goalsData$: Observable<[GoalOfferModel[], TrackingDomainsInterface]> = this.advertiserAccessOfferDetailQuery.select().pipe(
        map((data) => {
            return [data.goals, data.tracking_domain];
        })
    );

    readonly targeting$: Observable<[OfferViewTargetingModel, ExtendedTargetingInterface[]]> = this.advertiserAccessOfferDetailQuery
        .select()
        .pipe(
            map((data) => {
                return [data.targeting, data.extended_targeting];
            })
        );

    readonly isExtendedTargetingNotEmpty: Observable<boolean> = this.advertiserAccessOfferDetailQuery
        .select('extended_targeting')
        .pipe(map((value) => value.length > 0));

    readonly showCreatives$: Observable<boolean> = this.advertiserAccessOfferDetailQuery
        .select('creatives')
        .pipe(map((creatives) => !!creatives?.length));

    readonly creatives$: Observable<[AffiliateOfferCreativeModel[], TrackingDomainsInterface]> = this.advertiserAccessOfferDetailQuery
        .select()
        .pipe(
            map((data) => {
                return [data.creatives, data.tracking_domain];
            })
        );

    readonly links$ = this.advertiserAccessOfferDetailQuery.links$;

    constructor(
        private readonly advertiserAccessOfferDetailService: AdvertiserAccessOfferDetailService,
        private readonly advertiserAccessOfferDetailQuery: AdvertiserAccessOfferDetailQuery,
        public profileQuery: ProfileQuery,
        protected pageTitleService: PageTitleService,
        private router: Router,
        private readonly route: ActivatedRoute,
        private readonly unsubscribe: UnsubscribeService
    ) {
        this.offerId = this.route.snapshot.params.id;
    }

    ngOnInit(): void {
        this.advertiserAccessOfferDetailService
            .view(this.offerId)
            .pipe(
                catchError((error) => {
                    this.router.navigate([`/advertiser/offers/all`]);
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe((data) => {
                if (data) {
                    this.checkTargeting(data);
                    this.setBreadcrumb(data?.title);
                }
            });
    }

    checkTargeting(offer: AdvertiserAccessOfferViewModel): void {
        const targeting: OfferViewTargetingModel = offer?.targeting;
        if (targeting) {
            Object.keys(offer.targeting).forEach((target: any) => {
                if (target) {
                    Object.keys((targeting as any)?.[target]).forEach((data) => {
                        if ((targeting as any)?.[target]?.[data]) {
                            this.showTargeting = true;
                        }
                    });
                }
            });
        }
    }

    private setBreadcrumb(title: string): void {
        const breadcrumb: BreadcrumbInterface[] = [
            {
                key: 'main_navigation.offers',
                link: `/advertiser/offers/all`,
                current: false
            },
            {
                key: null,
                title: `#${this.offerId} ${title}`,
                link: null,
                current: true
            }
        ];

        this.pageTitleService.setTitle(breadcrumb);
    }
}
