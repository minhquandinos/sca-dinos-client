import { Injectable } from '@angular/core';
import { Observable, OperatorFunction, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ShortEntityListService } from '@scaleo/shared/data-access/short-entity-list';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

import { OfferTrafficDistributionApi } from '../api/offer-traffic-distribution.api';
import { OfferTrafficDistributionMethodEnum } from '../enum/offer-traffic-distribution.enum';
import { OfferTrafficDistributionAbTestingQueryParamsDto } from '../models/offer-traffic-distribution-ab-testing';
import { OfferTrafficDistributionQuery } from './offer-traffic-distribution.query';
import { OfferTrafficDistributionStore } from './offer-traffic-distribution.store';

@Injectable()
export class OfferTrafficDistributionService {
    constructor(
        private readonly api: OfferTrafficDistributionApi,
        private readonly store: OfferTrafficDistributionStore,
        private readonly query: OfferTrafficDistributionQuery,
        private readonly shortEntityListService: ShortEntityListService,
        private readonly toastr: ToastrBarService
    ) {}

    updateMethod(offerId: number, method: OfferTrafficDistributionMethodEnum): Observable<OfferTrafficDistributionMethodEnum> {
        const schema = 'offers_page.traffic_distribution.distribution_method';
        return this.api.updateMethod(offerId, { traffic_distribution_method: method }).pipe(
            tap(() => {
                this.store.update({
                    method
                });
                this.toastr.response(ToastrBarEventEnum.Updated, schema);
            }),
            this.baseException()
        );
    }

    updateQueryParams({ rangeFrom, rangeTo }: OfferTrafficDistributionAbTestingQueryParamsDto): void {
        this.store.update({
            queryParams: {
                rangeFrom,
                rangeTo
            }
        });
    }

    getMethod(offerId: number): Observable<OfferTrafficDistributionMethodEnum> {
        return this.api.getMethod(offerId).pipe(
            tap((method) => {
                this.store.update({
                    method
                });
            })
        );
    }

    private baseException(): OperatorFunction<any, any> {
        return catchError((error) => {
            this.toastr.exception();
            return throwError(error);
        });
    }
}
