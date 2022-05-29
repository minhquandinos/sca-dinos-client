import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { OfferDetailQuery, OfferDetailService } from '@scaleo/feature/manager/offer/detail/data-access';
import { FormatService } from '@scaleo/platform/format/service';
import { BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';

@Component({
    selector: 'scaleo-manager-offer-detail-layout',
    template: `<router-outlet></router-outlet>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class OfferDetailLayoutComponent implements OnInit, OnDestroy {
    constructor(
        private offerDetailService: OfferDetailService,
        private unsubscribe: UnsubscribeService,
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly formatService: FormatService,
        private readonly pageTitleService: PageTitleService
    ) {}

    ngOnInit(): void {
        this.initPageTitle();
    }

    ngOnDestroy() {
        this.offerDetailService.resetStore();
    }

    private initPageTitle(): void {
        this.offerDetailQuery
            .select('title')
            .pipe(
                filter((title) => !!title),
                tap(() => {
                    this.setPageTitle();
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    private setPageTitle(): void {
        const { id, title } = this.offerDetailQuery;
        const currentTitle = this.formatService.format(title, 'idName', id);
        const breadcrumb: BreadcrumbInterface[] = [
            {
                key: 'main_navigation.offers',
                link: 'offers/all',
                current: false
            },
            {
                key: null,
                title: currentTitle,
                link: null,
                current: true
            }
        ];
        this.pageTitleService.setTitle(breadcrumb);
    }
}
