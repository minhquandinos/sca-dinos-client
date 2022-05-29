import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AdvertiserOfferListService } from '@scaleo/feature/advertiser/offer/list/data-access';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';

import { AdvertiserOfferListFiltersEnum } from './enums/advertiser-offer-list-filters.enum';

@Component({
    selector: 'scaleo-advertiser-offers-list-filters',
    templateUrl: './advertiser-offer-list-filters.component.html',
    providers: [FormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertiserOfferListFiltersComponent
    extends BaseListStaticFilters2Component<any, any, AdvertiserOfferListFiltersEnum>
    implements OnInit
{
    readonly offersListFiltersEnum = AdvertiserOfferListFiltersEnum;

    constructor(
        protected fomBuilder: FormBuilder,
        private advertiserOfferListService: AdvertiserOfferListService,
        protected route: ActivatedRoute,
        protected profile: ProfileQuery,
        protected cdr: ChangeDetectorRef
    ) {
        super(advertiserOfferListService, fomBuilder, cdr);
    }

    ngOnInit(): void {
        this.initFilterForm();
        this.checkSelectedAnyFilter();
    }

    private initFilterForm(): void {
        const { goalsTypes = [], tags = [], countries = [], status = '' } = this.filterParams.value || {};
        this.filterForm = this.fomBuilder.group({
            status: [status],
            goalsTypes: [goalsTypes],
            tags: [tags],
            countries: [countries]
        });
    }
}
