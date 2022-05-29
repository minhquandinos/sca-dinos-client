import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import {
    OfferRequestFilterType,
    OfferRequestsFilterEnum,
    OffersRequestsQuery,
    OffersRequestsService
} from '@scaleo/feature/manager/offer/request/list/data-access';

@Component({
    selector: 'app-offers-requests-filters',
    templateUrl: './offers-requests-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffersRequestsFiltersComponent implements OnInit {
    readonly totals$ = this.query.totalCount$;

    readonly statusesOutput$: Observable<string[]> = this.query.selectParamsValue$(OfferRequestsFilterEnum.Statuses);

    readonly statusesCount$ = this.query.selectFilterCount(OfferRequestsFilterEnum.Statuses);

    readonly offerOutput$ = this.query.selectParamsValue$('offers');

    readonly offerCount$ = this.query.selectFilterCount(OfferRequestsFilterEnum.Offers);

    readonly selectedAnyOutputFilter$ = this.query.selectedAnyOutputFilter$;

    readonly affiliateOutput$ = this.query.selectParamsValue$('affiliates');

    readonly affiliateCount$ = this.query.selectFilterCount(OfferRequestsFilterEnum.Affiliates);

    form: FormGroup;

    constructor(
        private readonly query: OffersRequestsQuery,
        private readonly fb: FormBuilder,
        private readonly offersRequestsService: OffersRequestsService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        const { statuses = [], offers = [], affiliates = [] } = this.query.getParams() || {};
        this.form = this.fb.group({
            statuses: [statuses],
            offers: [offers],
            affiliates: [affiliates]
        });
    }

    applyFilter(param: OfferRequestFilterType) {
        const { value } = this.form.get(param);
        this.offersRequestsService.updateParamsValue({ [param]: value });
    }

    clear(param: OfferRequestFilterType, event: boolean) {
        if (event) {
            this.offersRequestsService.updateParamsValue({ [param]: [] });
            this.form.get(param).patchValue([]);
        }
    }

    removeElement(param: OfferRequestFilterType, event: string | number) {
        const paramValue = this.offersRequestsService.getParamsValue(param);
        const newValue = (paramValue as unknown[]).filter((value) => value !== event);
        this.offersRequestsService.updateParamsValue({ [param]: newValue });
        this.form.get(param).patchValue(newValue);
    }
}
