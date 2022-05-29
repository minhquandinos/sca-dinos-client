import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Inject,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { ManagerReportReferralListService } from '@scaleo/feature/manager/reports/statistics/referrals/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';
import { FindAdvertisersComponent } from '@scaleo/shared/components/find';

const REFERRAL_FILTER = {
    affiliates: 'affiliates'
} as const;

type ReferralFilter = keyof typeof REFERRAL_FILTER;

@Component({
    selector: 'scaleo-report-filter',
    templateUrl: './manager-referral-filter.component.html',
    styleUrls: ['./manager-referral-filter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: Window, useValue: window }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerReferralFilterComponent extends BaseListStaticFilters2Component<any, any, ReferralFilter> implements OnInit {
    @HostBinding('class')
    hostClass = 'manager-referral-filter';

    @ViewChild('findAffiliatesRef')
    private set _findAffiliatesRef(component: FindAdvertisersComponent) {
        if (!this.findAffiliatesRef && component) {
            this.findAffiliatesRef = component;
        }
    }

    findAffiliatesRef: FindAdvertisersComponent;

    readonly referralFilter = REFERRAL_FILTER;

    readonly affiliateSelected$ = this.filterParams$.pipe(map((filters) => filters?.[REFERRAL_FILTER.affiliates] || []));

    readonly affiliateCount$ = this.affiliateSelected$.pipe(map((affiliates) => affiliates?.length));

    constructor(
        protected fomBuilder: FormBuilder,
        protected readonly service: ManagerReportReferralListService,
        protected readonly cdr: ChangeDetectorRef,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(service, fomBuilder, cdr);
    }

    ngOnInit(): void {
        this.initFilterForm();
        this.checkSelectedAnyFilter();
    }

    applyFilter(): void {
        this.service.updateParamsValue({ page: 1 });
        this.service.updatePayloadValue({
            filters: {
                ...this.filterForm.value
            }
        });
        this.checkSelectedAnyFilter();
    }

    private initFilterForm(): void {
        const { affiliates = [] } = this.filterParams?.value || {};
        this.filterForm = this.fomBuilder.group({
            [REFERRAL_FILTER.affiliates]: [affiliates]
        });
    }

    clearFilter(filterName: ReferralFilter): void {
        this.filterForm.patchValue({
            [filterName]: []
        });
        this.service.updateParamsValue({
            page: 1
        });
        this.service.updatePayloadValue({
            filters: {
                [filterName]: []
            }
        });
        this.checkSelectedAnyFilter();
        this.cdr.detectChanges();
    }

    removeFilter(filterName: ReferralFilter, incrementValue: string | number) {
        const newValue = this.filterForm.get(filterName).value.filter((elem: string | number) => elem !== incrementValue);
        this.filterForm.patchValue({
            [filterName]: newValue
        });
        this.service.updateParamsValue({
            page: 1
        });
        this.service.updatePayloadValue({
            filters: {
                [filterName]: newValue
            }
        });
        this.checkSelectedAnyFilter();
        this.cdr.detectChanges();
    }
}
