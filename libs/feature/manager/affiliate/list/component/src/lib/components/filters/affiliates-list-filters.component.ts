import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AffiliateListQueryParamsModel, AffiliateListService } from '@scaleo/feature/manager/affiliate/list/data-access';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';
import { FindManagersComponent } from '@scaleo/shared/components/find';

enum FilterEnum {
    Countries = 'countries',
    Tags = 'tags',
    Managers = 'managers'
}

@Component({
    selector: 'scaleo-affiliates-list-filters',
    templateUrl: './affiliates-list-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliatesListFiltersComponent
    extends BaseListStaticFilters2Component<any, AffiliateListQueryParamsModel, any>
    implements OnInit
{
    readonly filterEnum = FilterEnum;

    @ViewChild('findManagerRef')
    private set _findManagersRef(component: FindManagersComponent) {
        if (!this.findManagersRef) {
            this.findManagersRef = component;
        }
    }

    findManagersRef: FindManagersComponent;

    constructor(
        protected override service: AffiliateListService,
        protected override fomBuilder: FormBuilder,
        protected override cdr: ChangeDetectorRef,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(service, fomBuilder, cdr);
    }

    ngOnInit(): void {
        this.initFilterForm();
        this.checkSelectedAnyFilter();
    }

    export(format: SheetExtensionType): void {
        this.service.export(format).pipe(first()).subscribe();
    }

    private initFilterForm(): void {
        this.filterForm = this.fomBuilder.group({
            status: [this.filterParams.status || ''],
            managers: [this.filterParams.managers || ''],
            tags: [this.filterParams.tags || ''],
            countries: [this.filterParams.countries || '']
        });
    }
}
