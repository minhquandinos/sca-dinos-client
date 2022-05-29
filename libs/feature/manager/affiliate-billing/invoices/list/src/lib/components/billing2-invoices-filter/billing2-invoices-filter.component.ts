import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Billing2InvoicesFiltersService } from '@scaleo/feature/manager/affiliate-billing/invoices/data-access';
import { InvoicesParamsEnum } from '@scaleo/invoice/common';
import { FormatPipe } from '@scaleo/platform/format/pipe';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';
import { FindAffiliatesComponent } from '@scaleo/shared/components/find';

@Component({
    selector: 'app-billing2-invoices-filter',
    templateUrl: './billing2-invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FormatPipe]
})
export class Billing2InvoicesFilterComponent
    extends BaseListStaticFilters2Component<any, any, 'affiliates' | 'currencies' | 'payments_methods' | 'statuses'>
    implements OnInit
{
    @HostBinding('class') hostClass = 'd-block w-100';

    readonly invoicesParamsEnum = InvoicesParamsEnum;

    statusCount$: Observable<number> = of(0);

    currenciesCount$: Observable<number> = of(0);

    affiliatesCount$: Observable<number> = of(0);

    paymentMethodsCount$: Observable<number> = of(0);

    @ViewChild(FindAffiliatesComponent)
    private set _findAffiliatesRef(component: FindAffiliatesComponent) {
        if (component && !this.findAffiliatesRef) {
            this.findAffiliatesRef = component;
        }
    }

    findAffiliatesRef: FindAffiliatesComponent;

    private filters: { [key: string]: unknown[] } = {
        [InvoicesParamsEnum.Affiliates]: undefined,
        [InvoicesParamsEnum.Currencies]: undefined,
        [InvoicesParamsEnum.PaymentsMethods]: undefined,
        [InvoicesParamsEnum.Status]: undefined
    };

    constructor(
        protected fb: FormBuilder,
        private invoicesFiltersService: Billing2InvoicesFiltersService,
        protected readonly cdr: ChangeDetectorRef,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(invoicesFiltersService, fb, cdr);
    }

    ngOnInit(): void {
        this.initForm();
        this.checkSelectedAnyFilter();
        this.statusCount$ = this.count(InvoicesParamsEnum.Status);
        this.affiliatesCount$ = this.count(InvoicesParamsEnum.Affiliates);
        this.currenciesCount$ = this.count(InvoicesParamsEnum.Currencies);
        this.paymentMethodsCount$ = this.count(InvoicesParamsEnum.PaymentsMethods);
    }

    private initForm(): void {
        this.filterForm = this.fb.group({
            [InvoicesParamsEnum.Status]: [this.filterParams?.[InvoicesParamsEnum.Status] || []],
            [InvoicesParamsEnum.Affiliates]: [this.filterParams?.[InvoicesParamsEnum.Affiliates] || []],
            [InvoicesParamsEnum.PaymentsMethods]: [this.filterParams?.[InvoicesParamsEnum.PaymentsMethods] || []],
            [InvoicesParamsEnum.Currencies]: [this.filterParams?.[InvoicesParamsEnum.Currencies] || []]
        });
    }

    count(filterName: InvoicesParamsEnum): Observable<number> {
        return this.filterParams$.pipe(
            pluck(filterName),
            map((elem) => elem?.length || 0)
        );
    }
}
