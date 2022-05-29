import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { ReportReferralsService } from '@scaleo/reports/referrals/data-access';

import {
    AffiliateReportReferralListDto,
    AffiliateReportReferralListModel,
    AffiliateReportReferralListPayloadParamsDto,
    AffiliateReportReferralListQueryParamsDto
} from '../affiliate-report-referral-list.model';
import { AffiliateReportReferralListQuery } from './affiliate-report-referral-list.query';
import { AffiliateReportReferralListState, AffiliateReportReferralListStore } from './affiliate-report-referral-list.store';

@Injectable()
export class AffiliateReportReferralListService extends BaseEntityService<AffiliateReportReferralListState> {
    constructor(
        protected store: AffiliateReportReferralListStore,
        protected query: AffiliateReportReferralListQuery,
        private readonly reportReferralsService: ReportReferralsService,
        private readonly jsonConvertService: JsonConvertService
    ) {
        super(store, query);
    }

    index(): Observable<AffiliateReportReferralListModel> {
        const observable = combineLatest([this.query.selectParams$(), this.query.selectPayload$()]).pipe(
            switchMap(([queryParams, queryPayload]) => {
                return this.reportReferralsService.index<
                    AffiliateReportReferralListDto,
                    AffiliateReportReferralListQueryParamsDto,
                    AffiliateReportReferralListPayloadParamsDto
                >(queryParams, queryPayload as any);
            }),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            tap(({ results }) => {
                const mapper = this.jsonConvertService.mapper(AffiliateReportReferralListModel, results);
                this.store.set(mapper);
            }),
            map(({ results }) => {
                return results;
            })
        );

        return this.observable(observable);
    }
}
