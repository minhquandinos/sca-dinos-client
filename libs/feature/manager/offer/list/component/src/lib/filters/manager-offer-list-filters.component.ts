import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ManagerOfferListService } from '@scaleo/feature/manager/offer/list/data-access';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';
import { FindAdvertisersComponent } from '@scaleo/shared/components/find';

import { ManagerOfferListFiltersEnum } from './enums/manager-offer-list-filters.enum';

@Component({
    selector: 'app-offers-list-filters',
    templateUrl: './manager-offer-list-filters.component.html',
    providers: [FormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerOfferListFiltersComponent
    extends BaseListStaticFilters2Component<any, any, ManagerOfferListFiltersEnum>
    implements OnInit
{
    readonly offersListFiltersEnum = ManagerOfferListFiltersEnum;

    @ViewChild('findAdvertiserRef')
    private set _findAdvertiserRef(component: FindAdvertisersComponent) {
        if (!this.findAdvertiserRef && component) {
            this.findAdvertiserRef = component;
        }
    }

    findAdvertiserRef: FindAdvertisersComponent;

    constructor(
        protected fomBuilder: FormBuilder,
        protected service: ManagerOfferListService,
        protected route: ActivatedRoute,
        protected profile: ProfileQuery,
        protected readonly cdr: ChangeDetectorRef,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(service, fomBuilder, cdr);
    }

    ngOnInit(): void {
        this.initFilterForm();
        this.checkSelectedAnyFilter();
    }

    // clearFilter(filterName: ManagerOfferListFiltersEnum): void {
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
    // removeFilter(filterName: ManagerOfferListFiltersEnum, incrementValue: string | number) {
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

    private initFilterForm(): void {
        const {
            goalsTypes = [],
            tags = [],
            countries = [],
            advertisers = [],
            visible_type = [],
            status = [this.filterParams.status || '']
        } = this.filterParams.value || {};
        this.filterForm = this.fomBuilder.group({
            status: status,
            goalsTypes: [goalsTypes],
            tags: [tags],
            countries: [countries],
            advertisers: [advertisers],
            visible_type: [visible_type]
        });
    }
}
