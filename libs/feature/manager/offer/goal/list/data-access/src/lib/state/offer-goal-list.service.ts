import { Injectable } from '@angular/core';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { OfferGoalListApi } from '@scaleo/feature/manager/offer/goal/list/api';
import { GoalStatusNameEnum, offerGoalMatchStatus } from '@scaleo/platform/list/access-data';
import { objectUtil } from '@scaleo/utils';

import { OfferGoalListModel } from '../models/offer-goals.model';
import { OfferGoalListQuery } from './offer-goal-list.query';
import { OfferConfigGoalsState, OfferGoalListStore } from './offer-goal-list.store';

@Injectable()
export class OfferGoalListService extends BaseEntityService<OfferConfigGoalsState> {
    constructor(
        protected store: OfferGoalListStore,
        protected query: OfferGoalListQuery,
        private api: OfferGoalListApi,
        private readonly offerDetailQuery: OfferDetailQuery
    ) {
        super(store, query);
    }

    index() {
        return this.query.reloading$.pipe(
            startWith(''),
            switchMap(() => objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1)),
            switchMap((queryParams) => this.api.index(this.offerDetailQuery.id, queryParams)),
            tap(({ pagination }) => {
                this.store.update({
                    data: {
                        pagination
                    }
                });
            }),
            map(({ results }) => {
                this.store.set(results);
                return results;
            })
        );
    }

    create(value: OfferGoalListModel) {
        const filterStatus = this.getParamsValue('status') as GoalStatusNameEnum;
        if (!filterStatus || filterStatus === offerGoalMatchStatus(value.status)) {
            this.store.add(value);
            this.reload();
        }
    }

    update(id: number, value: Partial<OfferGoalListModel>) {
        if (!this.filterStatus || this.filterStatus === offerGoalMatchStatus(value.status)) {
            if (value.is_default) {
                const { id: prevId } = this.query.getAll().find((elem) => elem.is_default);
                if (prevId) {
                    this.store.update(prevId, (state) => ({
                        ...state,
                        is_default: false
                    }));
                }
            }

            this.store.update(id, value);
        } else {
            this.store.remove(id);
        }
        this.reload();
    }

    remove(id: number) {
        this.store.remove(id);
        this.reload();
    }

    setSearch(search: string) {
        this.updateParamsValue({ search, page: 1 });
    }

    get getAll() {
        return this.query.getAll();
    }

    private get filterStatus(): GoalStatusNameEnum {
        return this.getParamsValue('status');
    }
}
