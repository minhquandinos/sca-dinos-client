import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';

import { DeliveriesQuery, DeliveriesService } from '@scaleo/feature-manager-leads-deliver-deliveries-list-data-access';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';

@Component({
    selector: 'scaleo-leads-deliveries-filters',
    templateUrl: './deliveries-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveriesFiltersComponent extends BaseListStaticFilters2Component<any, any, 'campaigns'> implements OnInit {
    @HostBinding('class') hostClass = 'w-100';

    readonly excludeStatusId = [PlatformListsStatusesEnum.Pending, PlatformListsStatusesEnum.Rejected];

    readonly campaignsSelected$ = this.deliveriesQuery.selectParamsValue$('campaigns');

    readonly campaignsCount$ = this.campaignsSelected$.pipe(map((campaigns) => campaigns?.length || 0));

    constructor(
        private readonly deliveriesQuery: DeliveriesQuery,
        protected override service: DeliveriesService,
        protected override fomBuilder: FormBuilder,
        protected override cdr: ChangeDetectorRef
    ) {
        super(service, fomBuilder, cdr);
    }

    ngOnInit(): void {
        this.initFilterForm();
    }

    private initFilterForm() {
        this.filterForm = this.fomBuilder.group({
            status: this.filterParams.status || '',
            campaigns: this.filterParams.campaigns || null
        });
    }
}
