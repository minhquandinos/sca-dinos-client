import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pluck, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { ManagerReferralModel, ManagerReferralService } from '@scaleo/feature/manager/affiliate/referral/data-access';

import { ManagerAffiliateReferralWidgetQuery } from './manager-affiliate-referral-widget.query';
import { ManagerAffiliateReferralWidgetState, ManagerAffiliateReferralWidgetStore } from './manager-affiliate-referral-widget.store';

@Injectable()
export class ManagerAffiliateReferralWidgetService extends BaseEntityService<ManagerAffiliateReferralWidgetState> {
    readonly totalCount$ = new BehaviorSubject<number>(0);

    constructor(
        protected store: ManagerAffiliateReferralWidgetStore,
        protected query: ManagerAffiliateReferralWidgetQuery,
        private readonly managerReferralService: ManagerReferralService
    ) {
        super(store, query);
    }

    index(id: number): Observable<ManagerReferralModel[]> {
        const observable = this.query.selectParams$().pipe(
            switchMap((queryParams) => this.managerReferralService.index(queryParams, id)),
            tap(({ pagination: { total_count = 0 } = {}, results }) => {
                this.updateDataValue({ totalCount: total_count });
                this.store.set(results);
            }),
            pluck('results')
        );

        return this.observable(observable);
    }
}
