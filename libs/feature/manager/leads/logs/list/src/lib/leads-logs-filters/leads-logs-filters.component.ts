import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LeadsLogsFiltersEnum, LeadsLogsQuery, LeadsLogsService } from '@scaleo/feature/manager/leads/logs/data-access';
import { IdNameFormatService } from '@scaleo/platform/format/service';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';

@Component({
    selector: 'scaleo-manager-leads-logs-filters',
    templateUrl: './leads-logs-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsLogsFiltersComponent extends BaseListStaticFilters2Component<any, any, any> implements OnInit {
    @HostBinding('class') hostClass = 'w-100';

    readonly affiliates$ = this.query.selectPayloadValue$('filters').pipe(map(({ affiliates }) => affiliates));

    readonly offers$ = this.query.selectPayloadValue$('filters').pipe(map(({ offers }) => offers));

    readonly affiliatesCount$: Observable<number> = this.affiliates$.pipe(map((affiliates) => affiliates?.length));

    readonly offersCount$: Observable<number> = this.offers$.pipe(map((offers) => offers?.length));

    readonly leadsLogsFiltersEnum = LeadsLogsFiltersEnum;

    constructor(
        private readonly idNameFormatService: IdNameFormatService,
        protected readonly fb: FormBuilder,
        protected override readonly service: LeadsLogsService,
        protected override readonly cdr: ChangeDetectorRef,
        private readonly query: LeadsLogsQuery
    ) {
        super(service, fb, cdr);
    }

    ngOnInit(): void {
        this.initForm();
    }

    override applyFilter(): void {
        this.service.updateParamsValue({ page: 1 });
        this.service.updatePayloadValue({ filters: this.filterForm.value });
        this.checkSelectedAnyFilter();
    }

    override clearFilter(filterName: LeadsLogsFiltersEnum): void {
        this.service.updateParamsValue({ page: 1 });
        this.filterForm.patchValue({
            [filterName]: []
        });
        this.service.updatePayloadValue({
            filters: {
                ...this.query.getPayloadValue('filters'),
                [filterName]: []
            }
        } as any);
        this.checkSelectedAnyFilter();
        this.cdr.detectChanges();
    }

    override removeFilter(filterName: LeadsLogsFiltersEnum, incrementValue: string | number) {
        this.service.updateParamsValue({ page: 1 });
        const newValue = this.filterForm.get(filterName).value.filter((elem: string | number) => elem !== incrementValue);
        this.filterForm.patchValue({
            [filterName]: newValue
        });
        this.service.updatePayloadValue({
            filters: {
                ...this.query.getPayloadValue('filters'),
                [filterName]: newValue
            }
        } as any);
        this.checkSelectedAnyFilter();
        this.cdr.detectChanges();
    }

    private initForm(): void {
        this.filterForm = this.fb.group({
            [LeadsLogsFiltersEnum.Affiliates]: this.filterParams?.[LeadsLogsFiltersEnum.Affiliates] || [],
            [LeadsLogsFiltersEnum.Offers]: this.filterParams?.[LeadsLogsFiltersEnum.Offers] || []
        });
    }
}
