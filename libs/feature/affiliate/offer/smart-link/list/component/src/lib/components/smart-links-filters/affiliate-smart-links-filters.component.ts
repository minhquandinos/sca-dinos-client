import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import {
    AffiliateOfferSmartLinkListQueryParamsModel,
    AffiliateSmartLinkListService
} from '@scaleo/feature/affiliate/offer/smart-link/list/data-access';
import { SmartLinkStatusesType } from '@scaleo/offer/smart-link/common';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-smart-links-filters',
    templateUrl: './affiliate-smart-links-filters.component.html'
})
export class AffiliateSmartLinksFiltersComponent implements OnInit {
    private _filterParams$: BehaviorSubject<AffiliateOfferSmartLinkListQueryParamsModel> =
        new BehaviorSubject<AffiliateOfferSmartLinkListQueryParamsModel>(null);

    @Input() set params(params: AffiliateOfferSmartLinkListQueryParamsModel) {
        this._filterParams$.next(params);
    }

    @Input() totals: number;

    form: FormGroup;

    readonly excludeStatusId = [PlatformListsStatusesEnum.Pending];

    constructor(private service: AffiliateSmartLinkListService, private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            status: [this._filterParams$.value.status || '']
        });
    }

    setFilterStatus(status: SmartLinkStatusesType): void {
        this.service.updateParamsValue({ status });
    }
}
