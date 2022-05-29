import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AdvertiserDetailQuery, AdvertiserDetailService } from '@scaleo/feature/manager/advertiser/detail/data-access';
import { MANAGER_ENTITY_DETAIL_TOKEN } from '@scaleo/feature/manager/common/entity-detail';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';
import { BaseNavModel, BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';

@Component({
    selector: 'app-advertiser-detail-sub-page-layout',
    templateUrl: './advertiser-detail-sub-page-layout.component.html',
    providers: [
        UnsubscribeService,
        {
            provide: MANAGER_ENTITY_DETAIL_TOKEN,
            useFactory: (route: ActivatedRoute) => {
                return route?.parent?.snapshot?.params?.id;
            },
            deps: [ActivatedRoute]
        }
    ]
})
export class AdvertiserDetailSubPageLayoutComponent implements OnInit {
    readonly advertiserId: number;

    readonly managerPermissions = PLATFORM_PERMISSIONS;

    readonly navigation: BaseNavModel[] = [];

    constructor(
        private route: ActivatedRoute,
        private advertiserDetailQuery: AdvertiserDetailQuery,
        private advertiserDetailService: AdvertiserDetailService,
        private readonly unsubscribe: UnsubscribeService,
        private pageTitleService: PageTitleService,
        private readonly navigateRootService: NavigateRootService
    ) {
        this.advertiserId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.advertiserDetailQuery
            .select()
            .pipe(
                switchMap((state) => {
                    if (state?.id) {
                        return of(state);
                    }
                    return this.advertiserDetailService.view(this.advertiserId).pipe(
                        map(({ id, company_name }) => {
                            return {
                                id,
                                company_name
                            };
                        })
                    );
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe((advertiser) => {
                this.initBreadcrumb(advertiser.company_name);
            });
    }

    private initBreadcrumb(company: string): void {
        const breadcrumb: BreadcrumbInterface[] = [
            {
                key: 'main_navigation.advertisers',
                link: this.navigateRootService.path(`/advertisers`),
                current: false
            },
            {
                key: null,
                title: `#${this.advertiserId} ${company}`,
                link: this.navigateRootService.path(`/advertisers/${this.advertiserId}`),
                current: true
            }
        ];
        this.pageTitleService.setTitle(breadcrumb);
    }
}
