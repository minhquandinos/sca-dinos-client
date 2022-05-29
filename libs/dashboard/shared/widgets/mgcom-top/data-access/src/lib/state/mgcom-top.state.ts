import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { DashboardWidgetSettingsModel, WidgetFiltersInterface, WidgetSettingsInterface } from '@scaleo/dashboard/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { Filter2Interface } from '@scaleo/shared/services/filters';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { UiTableSortInterface } from '@scaleo/ui-kit/elements';

import { MgcomTopInterface } from '../types/mgcom-top.interface';

@Injectable()
export class MgcomTopState implements WidgetFiltersInterface, WidgetSettingsInterface {
    // TODO refactor for private param
    widgetFilters$: BehaviorSubject<Filter2Interface> = new BehaviorSubject<Filter2Interface>({
        params: {
            page: 1,
            perPage: 15,
            sortField: 'clicks_for_the_day',
            sortDirection: 'desc'
        },
        payload: {
            rangeFrom: '',
            rangeTo: '',
            breakdown: BreakdownEnum.Offer,
            columns:
                'clicks_for_the_month,conversions_for_the_month,clicks_for_the_day,conversions_for_the_day,clicks_change_for_the_day,conversions_change_for_the_day,clicks_for_seven_days,conversions_for_seven_days,clicks_change_for_seven_days,conversions_change_for_seven_days,critical_change'
        }
    });

    widgetSettings$: BehaviorSubject<DashboardWidgetSettingsModel> = new BehaviorSubject<DashboardWidgetSettingsModel>(null);

    private data$: BehaviorSubject<ApiResponseWithPagination<MgcomTopInterface[]>> = new BehaviorSubject<
        ApiResponseWithPagination<MgcomTopInterface[]>
    >(MgcomTopState.initialDataStore);

    readonly _data$: Observable<ApiResponseWithPagination<MgcomTopInterface[]>> = this.data$.asObservable();

    private activeTab$: BehaviorSubject<BreakdownEnum> = new BehaviorSubject<BreakdownEnum>(BreakdownEnum.Offer);

    _activeTab$: Observable<BreakdownEnum> = this.activeTab$.asObservable();

    private isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    _isLoad$: Observable<boolean> = this.isLoad$.asObservable();

    constructor(private readonly pathFileService: PathFileService) {}

    private static get initialDataStore(): ApiResponseWithPagination<MgcomTopInterface[]> {
        return {
            pagination: null,
            results: []
        };
    }

    setData(data: ApiResponseWithPagination<MgcomTopInterface[]>): void {
        let results;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { page_count, current_page } = data.pagination;
        if (page_count > 1 && current_page > 1) {
            results = [...this.data$.value.results, ...this.resultTransform(data.results)];
        }

        this.data$.next({
            pagination: data.pagination,
            results: results || this.resultTransform(data.results)
        });
    }

    setFilters(filter: Filter2Interface): void {
        this.widgetFilters$.next(filter);
    }

    sortingData({ field, direction }: UiTableSortInterface): void {
        this.clearStore();
        const { params, payload } = this.widgetFilters$.value;
        this.widgetFilters$.next({
            params: {
                ...params,
                page: 1,
                sortField: field,
                sortDirection: direction
            },
            payload
        });
    }

    filteredDataByManager(id: number[]): void {
        const { params, payload } = this.widgetFilters$.value;
        this.widgetFilters$.next({
            params,
            payload: {
                ...payload,
                filters: {
                    manager: id.join(',')
                }
            }
        });
    }

    nextPage(): void {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { current_page, page_count } = this.data$.value.pagination;
        if (current_page < page_count) {
            const { params, payload } = this.widgetFilters$.value;
            this.widgetFilters$.next({
                params: {
                    ...params,
                    page: params.page + 1
                },
                payload
            });
        }
    }

    private resultTransform(data: MgcomTopInterface[]): MgcomTopInterface[] {
        return data.map((item) => ({
            ...item,
            managers: item.managers.map((manager) => ({
                ...manager,
                image: this.pathFileService.platformImage(manager.image, 'users')
            })) as ShortManagerModel[]
        }));
    }

    switchTab(tab: BreakdownEnum): void {
        this.clearStore();
        const { params, payload } = this.widgetFilters$.value;
        this.widgetFilters$.next({
            params: {
                ...params,
                page: 1
            },
            payload: {
                ...payload,
                breakdown: tab
            }
        });

        this.activeTab$.next(tab);
    }

    private clearStore(): void {
        this.data$.next(MgcomTopState.initialDataStore);
    }

    loaded(load: boolean): void {
        this.isLoad$.next(load);
    }
}
