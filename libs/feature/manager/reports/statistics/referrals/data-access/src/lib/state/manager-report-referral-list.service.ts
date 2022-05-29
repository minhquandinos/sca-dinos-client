import { Injectable } from '@angular/core';
import { combineLatest, debounceTime, map, Observable, switchMap, tap } from 'rxjs';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { ReportReferralsService } from '@scaleo/reports/referrals/data-access';
import { objectUtil } from '@scaleo/utils';

import {
    ManagerReportReferralListDto,
    ManagerReportReferralListModel,
    ManagerReportReferralListPayloadParamsDto,
    ManagerReportReferralListQueryParamsDto
} from '../manager-report-referral-list.model';
import { ManagerReportReferralListQuery } from './manager-report-referral-list.query';
import { ManagerReportReferralListState, ManagerReportReferralListStore } from './manager-report-referral-list.store';

@Injectable()
export class ManagerReportReferralListService extends BaseEntityService<ManagerReportReferralListState> {
    constructor(
        protected store: ManagerReportReferralListStore,
        protected query: ManagerReportReferralListQuery,
        private readonly reportReferralsService: ReportReferralsService,
        private readonly jsonConvertService: JsonConvertService
    ) {
        super(store, query);
    }

    index(): Observable<ManagerReportReferralListModel> {
        const observable = combineLatest([
            objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1),
            this.query.selectPayload$()
        ]).pipe(
            debounceTime(300),
            switchMap(([queryParams, queryPayload]) => {
                const prepareQueryPayload = {
                    ...queryPayload,
                    filters: {
                        affiliates: queryPayload?.filters?.affiliates ? queryPayload.filters.affiliates.join(',') : undefined
                    }
                };

                return this.reportReferralsService.index<
                    ManagerReportReferralListDto,
                    ManagerReportReferralListQueryParamsDto,
                    ManagerReportReferralListPayloadParamsDto
                >(queryParams, prepareQueryPayload as any);
            }),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            tap(({ results }) => {
                const mapper = this.jsonConvertService.mapper(ManagerReportReferralListModel, results);
                this.store.set(mapper);
            }),
            map(({ results }) => {
                return results;
            })
        );

        return this.observable(observable);
    }
}
