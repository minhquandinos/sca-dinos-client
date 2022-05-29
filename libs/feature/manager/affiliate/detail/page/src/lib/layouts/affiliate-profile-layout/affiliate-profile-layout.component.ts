import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { pluck, takeUntil, tap } from 'rxjs/operators';

import { NAVIGATION_PATH_TOKEN } from '@scaleo/core/navigation/common';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateDetailQuery, AffiliateDetailService } from '@scaleo/feature/manager/affiliate/detail/data-access';
import { ManagerPathResolverType } from '@scaleo/feature/manager/core/navigation';
import { BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';

@Component({
    selector: 'app-affiliate-profile-layout',
    template: `<router-outlet></router-outlet>`,
    providers: [UnsubscribeService]
})
export class AffiliateProfileLayoutComponent implements OnInit, OnDestroy {
    constructor(
        private readonly unsubscribe: UnsubscribeService,
        private readonly route: ActivatedRoute,
        private readonly affiliateDetailService: AffiliateDetailService,
        private readonly affiliateDetailQuery: AffiliateDetailQuery,
        private readonly pageTitleService: PageTitleService,
        @Inject(NAVIGATION_PATH_TOKEN) private readonly paths: ManagerPathResolverType
    ) {}

    ngOnInit(): void {
        this.subscribeToIdParamForLoadData();

        this.affiliateDetailQuery
            .select()
            .pipe(
                filter((affiliateDetail) => !!affiliateDetail?.id),
                takeUntil(this.unsubscribe)
            )
            .subscribe(({ id, company: title }) => {
                const pageTitle: BreadcrumbInterface[] = [
                    {
                        key: 'main_navigation.affiliates',
                        link: this.paths.affiliates.root,
                        current: false
                    },
                    {
                        key: `#${id}`,
                        title,
                        link: null,
                        current: true
                    }
                ];
                this.pageTitleService.setTitle(pageTitle);
            });
    }

    ngOnDestroy() {
        this.affiliateDetailService.resetStore();
    }

    private subscribeToIdParamForLoadData(): void {
        this.route.params
            .pipe(
                pluck('id'),
                tap((id) => {
                    this.affiliateDetailService.updateStore({
                        id
                    });
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }
}
