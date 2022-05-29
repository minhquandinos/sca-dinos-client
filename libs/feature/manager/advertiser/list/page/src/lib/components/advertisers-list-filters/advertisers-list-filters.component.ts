import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AdvertiserListQueryParamsModel, AdvertiserListService } from '@scaleo/feature/manager/advertiser/list/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';
import { FindManagersComponent } from '@scaleo/shared/components/find';

enum FilterEnum {
    Countries = 'countries',
    Tags = 'tags',
    Managers = 'managers'
}

@Component({
    selector: 'scaleo-mng-advertisers-list-filters',
    templateUrl: './advertisers-list-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertisersListFiltersComponent
    extends BaseListStaticFilters2Component<any, AdvertiserListQueryParamsModel, any>
    implements OnInit
{
    filterForm: FormGroup;

    readonly filterEnum = FilterEnum;

    @ViewChild('findManagerRef')
    private set _findManagersRef(component: FindManagersComponent) {
        if (!this.findManagersRef) {
            this.findManagersRef = component;
        }
    }

    findManagersRef: FindManagersComponent;

    constructor(
        protected override service: AdvertiserListService,
        protected override fomBuilder: FormBuilder,
        protected override cdr: ChangeDetectorRef,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(service, fomBuilder, cdr);
    }

    ngOnInit(): void {
        this.initFilterForm();
    }

    private initFilterForm(): void {
        this.filterForm = this.fomBuilder.group({
            status: [''],
            managers: [this.filterParams.managers || []],
            tags: [this.filterParams.tags || []],
            countries: [this.filterParams.countries || []]
        });
        this.checkSelectedAnyFilter();
    }

    // public clearFilter(filterName: FilterEnum): void {
    //     this.filterForm.patchValue({
    //         [filterName]: []
    //     });
    //     this.service.updateParamsValue({ [filterName]: [] });
    //     this.checkSelectedAnyFilter();
    //     this.cdr.detectChanges();
    // }
    //
    // removeFilter(filterName: FilterEnum, incrementValue: string | number): void {
    //     const newValue = this.filterForm.get(filterName).value.filter((elem: string | number) => elem !== incrementValue);
    //     this.filterForm.patchValue({
    //         [filterName]: newValue
    //     });
    //     this.service.updateParamsValue({ [filterName]: newValue });
    //     this.checkSelectedAnyFilter();
    //     this.cdr.detectChanges();
    // }
}
