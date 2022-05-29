import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferRequestSolveQueryParamsDto } from '@scaleo/feature/manager/offer/request/list/data-access';
import { OfferRequestStatusEnum } from '@scaleo/platform/list/access-data';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

import { OfferRequestType } from '../types/offer-request.type';

const OFFERS_REQUESTS_TRANSLATE_SCHEMA = 'offers_requests_page.toastr';
const OFFER_REQUEST_APPROVE_TRANSLATE = `${OFFERS_REQUESTS_TRANSLATE_SCHEMA}.approve`;
const OFFER_REQUEST_REJECT_TRANSLATE = `${OFFERS_REQUESTS_TRANSLATE_SCHEMA}.reject`;
const OFFER_REQUEST_APPROVE_EXCEPTION_TRANSLATE = `${OFFERS_REQUESTS_TRANSLATE_SCHEMA}.approve_exception`;
const OFFER_REQUEST_REJECT_EXCEPTION_TRANSLATE = `${OFFERS_REQUESTS_TRANSLATE_SCHEMA}.reject_exception`;

type OfferRequestMapType = { [K in OfferRequestType]: string };

@Injectable()
export class OfferRequestSolveService {
    constructor(private readonly rest: RestApiService, private readonly toastr: ToastrBarService) {}

    updateStatus(ids: number | number[], solve: OfferRequestType): Observable<void> {
        const params = this.prepare(ids, solve);

        return this.rest
            .get<ApiResponse<void>>('offers-requests-change-statuses', {
                request: {
                    params
                }
            })
            .pipe(
                tap(() => {
                    this.showToastr('success', solve);
                }),
                catchError((error) => {
                    this.showToastr('exception', solve);
                    return throwError(error);
                })
            );
    }

    private prepare(ids: number | number[], solve: OfferRequestType): HttpParams {
        const params: OfferRequestSolveQueryParamsDto = {
            ids: Array.isArray(ids) ? ArrayUtil.join(ids) : ids.toString(),
            status: solve === 'allow' ? OfferRequestStatusEnum.Approved : OfferRequestStatusEnum.Rejected
        };
        return RequestUtil.queryParams(params);
    }

    private showToastr(type: 'success' | 'exception', solve: OfferRequestType): void {
        if (type === 'success') {
            const successMap: OfferRequestMapType = {
                allow: OFFER_REQUEST_APPROVE_TRANSLATE,
                deny: OFFER_REQUEST_REJECT_TRANSLATE
            };
            this.toastr.successResponse(successMap[solve]);
        }

        if (type === 'exception') {
            const exceptionMap: OfferRequestMapType = {
                allow: OFFER_REQUEST_APPROVE_EXCEPTION_TRANSLATE,
                deny: OFFER_REQUEST_REJECT_EXCEPTION_TRANSLATE
            };

            this.toastr.exception(exceptionMap[solve]);
        }
    }
}
