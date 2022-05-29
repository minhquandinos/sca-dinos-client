import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import {
    BillingAffiliatesParamsStateModel,
    BillingAffiliatesService
} from '@scaleo/feature/manager/affiliate-billing/affiliates/data-access';
import { PlatformListsFormatInterface, PlatformListsService } from '@scaleo/platform/list/access-data';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';
import { SelectChangeModel } from '@scaleo/shared/components/select';

@Component({
    selector: 'app-billing-affiliates-filters',
    templateUrl: './billing-affiliates-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingAffiliatesFiltersComponent
    extends BaseListStaticFilters2Component<
        any,
        BillingAffiliatesParamsStateModel,
        'invoice_frequency' | 'payment_terms' | 'payment_methods'
    >
    implements OnInit
{
    @HostBinding('class') hostClass = 'w-100';

    filterForm: FormGroup;

    readonly platformListStatuses$ = this.getPlatformListStatuses$;

    constructor(
        protected readonly formBuilder: FormBuilder,
        protected readonly service: BillingAffiliatesService,
        private readonly platformListsService: PlatformListsService,
        protected readonly cdr: ChangeDetectorRef
    ) {
        super(service, formBuilder, cdr);
    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.filterForm = this.formBuilder.group({
            status: [this.filterParams.status || ''],
            invoice_frequency: [this.filterParams.invoice_frequency || []],
            payment_terms: [this.filterParams.payment_terms || []],
            payment_methods: [this.filterParams.payment_methods || []]
        });
    }

    searching(search: string): void {
        this.service.updateParamsValue({ search, page: 1 });
    }

    // clearFilter(filterName: 'invoice_frequency' | 'payment_terms' | 'payment_methods') {
    //     this.filterForm.patchValue({
    //         [filterName]: []
    //     });
    //     this.service.updateParamsValue({ [filterName]: [] });
    //     this.checkSelectedAnyFilter();
    // }
    //
    // removeFilter(filterName: 'invoice_frequency' | 'payment_terms' | 'payment_methods', incrementValue: string | number) {
    //     const newValue = this.filterForm.get(filterName).value.filter((elem: string | number) => elem !== incrementValue);
    //     this.filterForm.patchValue({
    //         [filterName]: newValue
    //     });
    //     this.service.updateParamsValue({ [filterName]: newValue });
    //     this.checkSelectedAnyFilter();
    // }

    public setFilterStatus(status: SelectChangeModel): void {
        this.service.updateParamsValue({ status: status?.newValue });
    }

    private get getPlatformListStatuses$(): Observable<PlatformListsFormatInterface[]> {
        return this.platformListsService.platformListsNew('statuses').pipe(pluck('statuses'));
    }
}
