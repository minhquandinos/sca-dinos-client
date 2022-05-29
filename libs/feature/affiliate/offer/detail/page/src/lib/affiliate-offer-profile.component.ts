import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AffiliatePostbackListModel } from '@scaleo/affiliate/postback/list/data-access';
import { MediaWatcherService } from '@scaleo/core/media-watcher/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_ACCESS_OFFER_DETAIL_PROVIDER,
    AffiliateAccessOfferDetailQuery,
    AffiliateAccessOfferDetailService,
    AffiliateOfferCreativeModel
} from '@scaleo/feature/affiliate/offer/detail/data-access';
import {
    ExtendedTargetingInterface,
    GoalOfferModel,
    OfferViewTargetingModel,
    OfferVisibilityModel,
    TrackingDomainsInterface
} from '@scaleo/offer/common';
import { OfferVisibilityAffiliateAccessView } from '@scaleo/offer/shared/fields/offer-visibility-affiliate-access';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { DateFormatService } from '@scaleo/platform/format/service';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-affiliate-offer-profile',
    templateUrl: './affiliate-offer-profile.component.html',
    providers: [AFFILIATE_ACCESS_OFFER_DETAIL_PROVIDER, UnsubscribeService]
})
export class AffiliateOfferProfileComponent implements OnInit {
    requestId: number = null;

    showRequestButton: boolean;

    hideCard: boolean;

    showConversionsStatusGoals = true;

    tableHeadersForShortStatistics = ['date', 'clicks', 'conversions', 'cr', 'approved_payout'];

    tableColumnsForShortStatistics: string;

    links$ = this.affiliateAccessOfferDetailQuery.links$;

    userId: number = this.profileQuery.profile.id;

    offerCustomUrl = this.settingsQuery.settings.affiliate_access_offer_custom_url;

    isShowOfferCustomUrl = this.settingsQuery.settings.affiliate_access_offer_custom_url_is_show;

    @ViewChild('previewButtonTemplate') previewButtonTemplate: TemplateRef<any>;

    @ViewChild('requestButtonTemplate') requestButtonTemplate: TemplateRef<any>;

    visibilityLabel$: Observable<string>;

    visibilityColor: string;

    readonly offerId: number;

    readonly offerData$ = this.affiliateAccessOfferDetailQuery.select();

    readonly showCreativeWidget$: Observable<boolean> = this.affiliateAccessOfferDetailQuery
        .select()
        .pipe(map((offer) => !!offer?.creatives?.length));

    readonly goalsData$: Observable<[GoalOfferModel[], TrackingDomainsInterface]> = this.affiliateAccessOfferDetailQuery.select().pipe(
        map((data) => {
            return [data.goals, data.tracking_domain];
        })
    );

    readonly currency$: Observable<CurrencyEnum> = this.affiliateAccessOfferDetailQuery.select('currency');

    readonly postbacks$: Observable<AffiliatePostbackListModel[]> = this.affiliateAccessOfferDetailQuery.select('postbacks');

    readonly targeting$: Observable<[OfferViewTargetingModel, ExtendedTargetingInterface[]]> = this.affiliateAccessOfferDetailQuery
        .select()
        .pipe(
            map((data) => {
                return [data.targeting, data.extended_targeting];
            })
        );

    readonly creatives$: Observable<[AffiliateOfferCreativeModel[], TrackingDomainsInterface]> = this.affiliateAccessOfferDetailQuery
        .select()
        .pipe(
            map((data) => {
                return [data.creatives, data.tracking_domain];
            })
        );

    public readonly isNotMobile$ = this.mediaWatcherService.isNotMobile$;

    constructor(
        private readonly affiliateAccessOfferDetailService: AffiliateAccessOfferDetailService,
        private readonly affiliateAccessOfferDetailQuery: AffiliateAccessOfferDetailQuery,
        protected pageTitleService: PageTitleService,
        protected profileQuery: ProfileQuery,
        private settingsQuery: PlatformSettingsQuery,
        private dateFormatService: DateFormatService,
        private router: Router,
        private readonly route: ActivatedRoute,
        private readonly modal3: Modal3Service,
        private readonly translate: TranslateService,
        private readonly fb: FormBuilder,
        private readonly unsubscribe: UnsubscribeService,
        private readonly mediaWatcherService: MediaWatcherService,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {
        this.offerId = this.route.snapshot.params.id;
        // super(profileQuery, offerProfileStore, pageTitleService, activatedRoute);
        this.initHeaderAndColumns();
    }

    ngOnInit(): void {
        this.affiliateAccessOfferDetailService
            .view(this.offerId)
            .pipe(
                catchError((error) => {
                    this.router.navigate([`/affiliate/offers/all`]);
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe((data) => {
                if (data) {
                    this.setBreadcrumb(data?.title);
                    this.initVisibility(data?.visible_type_selected);
                    // this.links = this.transformLinks(response.links);
                    //
                    // this.initVisibility(response?.visible_type_selected);
                    // this.initOfferRequest(response);
                }
            });
        // this.offerData = this.offerProfileStore.data$.pipe(
        //     map((data) => {
        //         if (data.status === 5) {
        //             this.router.navigate([`/${this.profileQuery.slug}/offers/all`]);
        //         }
        //         this.findPreviewLink(data.links);
        //         return data;
        //     }),
        //     catchError((err) => {
        //         if (err.code === 404) {
        //             this.router.navigate([`/${this.profileQuery.slug}/offers/all`]);
        //         }
        //         return of(undefined);
        //     })
        // );
        // this.offerProfileStore.data$.pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
        //     if (response) {
        //         this.links = this.transformLinks(response.links);
        //
        //         if (response?.creatives?.length === 0) {
        //             this.showCreativesBlock = false;
        //         }
        //
        //         this.initVisibility(response?.visible_type_selected);
        //         // this.initOfferRequest(response);
        //     }
        // });
    }

    // ngAfterViewInit(): void {
    //     this.offerProfileBaseComponent.requestContainerInit.pipe(takeUntil(this.unsubscribe)).subscribe((containerInit) => {
    //         if (containerInit) {
    //             this.offerProfileBaseComponent.requestButtonContainer.clear();
    //             this.offerProfileBaseComponent.requestButtonContainer.createEmbeddedView(this.requestButtonTemplate);
    //         }
    //     });
    //
    //     this.offerProfileBaseComponent._previewButtonContainer.pipe(takeUntil(this.unsubscribe)).subscribe((container) => {
    //         if (container && this.previewLink && this.requestId === OfferVisibilityRequestStatusIdEnum.Active) {
    //             container.clear();
    //             container.createEmbeddedView(this.previewButtonTemplate);
    //         }
    //     });
    // }

    // ngOnDestroy(): void {
    //     super.ngOnDestroy();
    // }

    // findPreviewLink(links: OfferUrlsInterface[]): void {
    //     if (links.length > 0) {
    //         const { url, preview } = ArrayUtil.findByKey(links, 'type', OfferUrlsTypesEnum.Default);
    //         this.previewLink = preview || url;
    //     }
    // }

    // requestOffer(): void {
    //     const { ask_approval_questions } = this.offerProfileStore.data;
    //     if (Util.numToBoolean(ask_approval_questions)) {
    //         this.askApprovalQuestions();
    //     } else {
    //         this.sendOfferRequest().pipe(take(1)).subscribe();
    //     }
    // }

    // private askApprovalQuestions(): void {
    //     this.initAskQuestionForm();
    //     const SUBMIT_EVENT = 'submit';
    //     const CANCEL_EVENT = 'cancel';
    //     const ref$ = this.modal3.info(this._offerRequestAnswerQuestionModalTpl, {
    //         title: this.translate.instant('offers_requests_page.ask_questions_affiliate'),
    //         footer: {
    //             controls: [
    //                 {
    //                     buttonType: 'simple',
    //                     label: this.translate.instant(`${TranslateSchemaEnum.InterfaceBasic}.cancel`),
    //                     eventName: CANCEL_EVENT
    //                 },
    //                 {
    //                     buttonType: 'main',
    //                     label: this.translate.instant(`${TranslateSchemaEnum.InterfaceBasic}.submit`),
    //                     eventName: SUBMIT_EVENT,
    //                     callback: (context): any => {
    //                         if (this.askQuestionForm.valid) {
    //                             const data = this.askQuestionForm.get('additional_info').value;
    //                             return context.close(data, SUBMIT_EVENT);
    //                         }
    //                         this.askQuestionForm.markAllAsTouched();
    //                         return undefined;
    //                     }
    //                 }
    //             ],
    //             borderTop: true
    //         }
    //     });
    //
    //     ref$.afterClosed$
    //         .pipe(
    //             filter(({ type }) => type === SUBMIT_EVENT),
    //             switchMap(({ data }) => this.sendOfferRequest(data)),
    //             tap(() => {
    //                 this.offerProfileStore.update();
    //                 this.showRequestButton = false;
    //             }),
    //             take(1)
    //         )
    //         .subscribe();
    // }
    //
    // private sendOfferRequest(answer: string = undefined): Observable<void> {
    //     return this.affiliateAccessOfferService.offerRequest(this.id, answer).pipe(
    //         tap(() => {
    //             this.offerProfileStore.update();
    //             this.showRequestButton = false;
    //         })
    //     );
    // }

    postbackWasUpdated() {
        this.affiliateAccessOfferDetailService.reload();
    }

    initHeaderAndColumns(): void {
        const canSeePendingConversions = this.checkPermissionService.check(this.permissions.canSeePendingConv);
        if (canSeePendingConversions) {
            this.tableColumnsForShortStatistics = 'clicks,cv_approved,cr,approved_payout';
            this.showConversionsStatusGoals = false;
        } else {
            this.tableColumnsForShortStatistics = 'clicks,cv_total,cr,total_payout,tr';
        }
    }

    private initVisibility(visibility: OfferVisibilityModel | OfferVisibilityModel[]): void {
        const { label$, showRequestButton, color, showHideCard } = new OfferVisibilityAffiliateAccessView(
            visibility,
            this.translate,
            this.dateFormatService
        );
        this.visibilityLabel$ = label$;
        this.visibilityColor = color;
        this.showRequestButton = showRequestButton;
        this.hideCard = showHideCard;
    }

    // private initAskQuestionForm(): void {
    //     this.askQuestionForm = this.fb.group({
    //         additional_info: ['', Validators.required]
    //     });
    // }

    // private initVisibility(visibility: OfferVisibilityModel | OfferVisibilityModel[]): void {
    //     const { label$, showRequestButton, color, showHideCard } = new OfferVisibilityAffiliateAccessView(
    //         visibility,
    //         this.translate,
    //         this.dateFormatService
    //     );
    //     this.visibilityLabel$ = label$;
    //     this.visibilityColor = color;
    //     this.showRequestButton = showRequestButton;
    //     this.hideCard = showHideCard;
    // }

    private setBreadcrumb(title: string): void {
        const breadcrumb: BreadcrumbInterface[] = [
            {
                key: 'main_navigation.offers',
                link: `/affiliate/offers/all`,
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
