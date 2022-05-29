import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GettingStartedService } from '@scaleo/feature/manager/getting-started/data-access';
import { PageTitleService } from '@scaleo/shared/services/page-title';

type EntityItemIdType = 'offer' | 'affiliate';

interface EntityItemModel {
    id: EntityItemIdType;
    path: string;
    label: string;
}

@Component({
    selector: 'scaleo-manager-step-create-first-item',
    templateUrl: './step-create-first-item.component.html'
})
export class StepCreateFirstItemComponent implements OnInit {
    path: string;

    readonly id: EntityItemIdType;

    label: string;

    arrayLists: EntityItemModel[] = [
        {
            id: 'offer',
            path: 'create-an-offer',
            label: 'main_navigation.offers'
        },
        {
            id: 'affiliate',
            path: 'create-an-affiliate',
            label: 'main_navigation.affiliates'
        }
    ];

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly gettingStartedNavigateService: GettingStartedService,
        private readonly pageTitleService: PageTitleService
    ) {
        this.id = this.route.snapshot.data?.item;
    }

    ngOnInit(): void {
        const { label = undefined, path = undefined } = this.arrayLists.find((item) => item.id === this.id) || {};
        this.label = label;
        this.path = path;
    }

    skip(): void {
        this.gettingStartedNavigateService.skip(this.route);
    }

    navigateToList(): void {
        const url = this.id === 'offer' ? 'offers' : 'affiliates';
        this.router.navigate([`../../../${url}`], { relativeTo: this.route });
    }
}
