import { Inject, Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import {
    BreakdownEnum,
    BreakdownsPathMapModel,
    NewReportStatisticsRouteEnum,
    NewStatisticBreakdownStateModel,
    NewStatisticsGroupModel,
    STATISTICS_BREAKDOWNS_TOKEN
} from '@scaleo/reports/statistic/common';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

import { NewReportStatisticsApi } from '../api/new-report-statistics.api';
import { NewReportStatisticsQuery } from './new-report-statistics.query';
import { BreakdownInColumnsModel, NewReportStatisticsStore } from './new-report-statistics.store';

@Injectable()
export class NewReportStatisticsBreakdownService {
    constructor(
        private api: NewReportStatisticsApi,
        private store: NewReportStatisticsStore,
        private query: NewReportStatisticsQuery,
        @Inject(STATISTICS_BREAKDOWNS_TOKEN) private readonly defaultBreakdowns: BreakdownsPathMapModel
    ) {}

    get(): Observable<NewStatisticsGroupModel[]> {
        return this.api.getBreakdowns().pipe(
            map((response) => response as any),
            share()
        );
    }

    initBreakdown(path: string, queryParams?: BaseObjectModel) {
        if (path !== NewReportStatisticsRouteEnum.Custom) {
            const newBreakdowns = this.defaultBreakdowns?.[path].map((breakdown) => ({
                breakdown: breakdown.breakdown,
                default: true
            }));

            this.storeUpdateBreakdown([...newBreakdowns]);
        }

        if (path === NewReportStatisticsRouteEnum.Custom && !queryParams?.['breakdown']) {
            this.storeUpdateBreakdown([]);
        }

        // TODO fast add new feature, for next step move to resolve and create functional for auto init breakdown
        if (path === NewReportStatisticsRouteEnum.Custom && queryParams?.['breakdown']) {
            this.storeUpdateBreakdown([
                {
                    breakdown: queryParams['breakdown']
                }
            ]);
        }
    }

    storeUpdateBreakdown(breakdowns: NewStatisticBreakdownStateModel[]) {
        this.store.update((state) => ({
            data: {
                ...state.data,
                breakdowns
            }
        }));
        this.setRequestFilter();
    }

    // TODO remove if not needed
    setCustomBreakdown(breakdown: BreakdownEnum) {
        const newBreakdown = {
            breakdown,
            default: false
        };

        this.storeUpdateBreakdown([newBreakdown]);
    }

    add(breakdown: BreakdownEnum): void {
        if (!this.breakdowns.some((item) => item.breakdown === breakdown)) {
            const newBreakdown: NewStatisticBreakdownStateModel = {
                breakdown
            };
            this.storeUpdateBreakdown([...this.breakdowns, newBreakdown]);
        }
    }

    remove(breakdown: BreakdownEnum) {
        const breakdowns = this.breakdowns.filter((item) => item.breakdown !== breakdown);
        this.storeUpdateBreakdown([...breakdowns]);
        this.removeBreakdownFromColumnsByBreakdown(breakdown);
    }

    get breakdownInColumns$(): Observable<BreakdownEnum[]> {
        // TODO remove any
        return this.query.select<any>(({ data: { breakdownInColumns } }: any) => [
            ...new Set(breakdownInColumns.map((item: any) => item.breakdown))
        ]);
    }

    get breakdowns$(): Observable<NewStatisticBreakdownStateModel[]> {
        return this.query.select(({ data: { breakdowns } }) => breakdowns);
    }

    get breakdowns(): NewStatisticBreakdownStateModel[] {
        return this.query.getValue().data.breakdowns;
    }

    get breakdownsFilter(): string[] {
        return this.breakdowns.map((item) => item.breakdown);
    }

    get breakdownColumnsTree$(): Observable<UiTableHeaderInterface[]> {
        return this.breakdownInColumns$.pipe(
            map((entity) => {
                if (entity.length > 0) {
                    return entity.map((breakdown) => ({
                        value: '',
                        children: [
                            {
                                value: breakdown,
                                isBreakdown: true
                            }
                        ]
                    }));
                }
                return null;
            })
        );
    }

    private setRequestFilter() {
        const breakdowns = this.breakdownsFilter;
        this.store.updateFilterBreakdowns(breakdowns.length > 0 ? breakdowns : []);
    }

    nextBreakdown(breakdown?: BreakdownEnum): BreakdownEnum {
        if (!breakdown && this.breakdowns.length > 0) {
            return this.breakdowns[0].breakdown;
        }

        if (breakdown && this.breakdowns.length > 0) {
            const list = this.breakdowns;
            const index = list.findIndex((item) => item.breakdown === breakdown);
            const next = index + 1 <= list.length ? list[index + 1] : undefined;

            return next ? next.breakdown : undefined;
        }

        return undefined;
    }

    breakdownIndex$(breakdown: BreakdownEnum): Observable<number> {
        return this.breakdownInColumns$.pipe(map((breakdowns) => breakdowns.findIndex((item) => item === breakdown)));
    }

    addBreakdownToColumns(id: ID, breakdown?: BreakdownEnum) {
        const breakdownInColumns: BreakdownInColumnsModel = {
            id,
            breakdown: breakdown || this.nextBreakdown()
        };

        this.store.update((state) => ({
            data: {
                ...state.data,
                breakdownInColumns: [...state.data.breakdownInColumns, breakdownInColumns]
            }
        }));
    }

    removeBreakdownFromColumns(id: ID = 'empty') {
        this.store.update((state) => ({
            data: {
                ...state.data,
                breakdownInColumns: [...state.data.breakdownInColumns].filter((el) => el.id !== id)
            }
        }));
    }

    private removeBreakdownFromColumnsByBreakdown(breakdown: BreakdownEnum) {
        this.store.update((state) => ({
            data: {
                ...state.data,
                breakdownInColumns: [...state.data.breakdownInColumns].filter((el) => el.breakdown !== breakdown)
            }
        }));
    }

    get first(): NewStatisticBreakdownStateModel {
        return this.breakdowns.length > 0 ? this.breakdowns[0] : undefined;
    }

    get first$(): Observable<NewStatisticBreakdownStateModel> {
        return this.breakdowns$.pipe(map((breakdowns) => breakdowns[0]));
    }

    get last(): NewStatisticBreakdownStateModel {
        if (this.breakdowns.length > 0) {
            return this.breakdowns.length > 1 ? this.breakdowns.slice(-1)[0] : this.first;
        }

        return undefined;
    }

    previousFrom(current: BreakdownEnum, previous: BreakdownEnum): BreakdownEnum {
        if (this.breakdowns.length > 1) {
            const index = this.breakdowns.findIndex((item) => item.breakdown === current);

            const previousBreakdown = this.breakdowns[index - 1].breakdown;
            return previousBreakdown === previous ? previousBreakdown : undefined;
        }

        return current;
    }
}
