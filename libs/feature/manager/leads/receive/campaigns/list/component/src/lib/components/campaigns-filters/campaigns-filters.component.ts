import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';

import {
    ReceiveLeadsCampaignListQuery,
    ReceiveLeadsCampaignListService
} from '@scaleo/feature-manager-leads-receive-campaigns-list-data-access';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { BaseListStaticFilters2Component } from '@scaleo/shared/components';

@Component({
    selector: 'app-campaigns-filters',
    templateUrl: './campaigns-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsFiltersComponent extends BaseListStaticFilters2Component<any, any, any> implements OnInit {
    readonly excludeStatusId = [PlatformListsStatusesEnum.Pending, PlatformListsStatusesEnum.Rejected];

    readonly offersSelected$ = this.receiveLeadsCampaignListQuery.selectParamsValue$('offers');

    readonly offersCount$ = this.offersSelected$.pipe(map((offers) => offers?.length || 0));

    @HostBinding('class') hostClass = 'w-100';

    constructor(
        private receiveLeadsCampaignListQuery: ReceiveLeadsCampaignListQuery,
        protected override service: ReceiveLeadsCampaignListService,
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
            offers: this.filterParams.offer || null
        });
    }
}
