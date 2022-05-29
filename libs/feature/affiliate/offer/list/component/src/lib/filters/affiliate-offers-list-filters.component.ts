import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AffiliateOfferListService } from '@scaleo/feature/affiliate/offer/list/data-access';
import { SheetExtensionType } from '@scaleo/platform/data';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { OfferAvailabilityEnum } from '@scaleo/platform/list/access-data';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';

import { AffiliateOffersListFiltersEnum } from './enums/affiliate-offers-list-filters.enum';

@Component({
    selector: 'scaleo-affiliate-offers-list-filters',
    templateUrl: './affiliate-offers-list-filters.component.html',
    providers: [FormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateOffersListFiltersComponent
    extends BaseListStaticFilters2Component<any, any, AffiliateOffersListFiltersEnum>
    implements OnInit
{
    readonly offersListFiltersEnum = AffiliateOffersListFiltersEnum;

    constructor(
        protected fomBuilder: FormBuilder,
        protected service: AffiliateOfferListService,
        protected route: ActivatedRoute,
        protected profile: ProfileQuery,
        protected cdr: ChangeDetectorRef
    ) {
        super(service, fomBuilder, cdr);
        this.exceptFilters = [...super.exceptFilters, 'availability'];
    }

    ngOnInit(): void {
        this.initFilterForm();
        this.checkSelectedAnyFilter();
    }

    // clearFilter(filterName: AffiliateOffersListFiltersEnum): void {
    //     this.filterForm.patchValue({
    //         [filterName]: []
    //     });
    //     this.service.updateParamsValue({
    //         [filterName]: []
    //     });
    //     this.checkSelectedAnyFilter();
    //     this.cdr.detectChanges();
    // }
    //
    // removeFilter(filterName: AffiliateOffersListFiltersEnum, incrementValue: string | number) {
    //     const newValue = this.filterForm.get(filterName).value.filter((elem: string | number) => elem !== incrementValue);
    //     this.filterForm.patchValue({
    //         [filterName]: newValue
    //     });
    //     this.service.updateParamsValue({
    //         [filterName]: newValue
    //     });
    //     this.checkSelectedAnyFilter();
    //     this.cdr.detectChanges();
    // }

    export(format: SheetExtensionType): void {
        this.service.export(format).pipe(first()).subscribe();
    }

    private initFilterForm(): void {
        const { status = '', goalsTypes = [], tags = [], countries = [], availability = '' } = this.filterParams.value || {};
        this.filterForm = this.fomBuilder.group({
            status: [status],
            goalsTypes: [goalsTypes],
            tags: [tags],
            countries: [countries],
            availability: [availability]
        });
    }

    setAvailability(availability: OfferAvailabilityEnum): void {
        this.service.updateParamsValue({ availability });
        this.checkSelectedAnyFilter();
    }
}
