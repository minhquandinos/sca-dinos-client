import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { ShortEntityListFactory, ShortEntityListInterface } from '@scaleo/shared/data-access/short-entity-list';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { Util } from '@scaleo/utils';

import { MultiSelectDataConfigModel } from '../models/multi-select-data-config.model';
import { MultiSelectBlockFacade } from '../state/multi-select-block.facade';
import { MultiSelectBlockState } from '../state/multi-select-block.state';
import { MultiSelectFilteringService } from './multi-select-filtering.service';
import { MultiSelectSearchService } from './multi-select-search.service';

@Injectable()
export class MultiSelectDynamicService {
    readonly fetchData$ = this.stateQuery('fetchData');

    private service: ShortEntityListInterface;

    constructor(
        private rest: RestApiService,
        private readonly stateFacade: MultiSelectBlockFacade,
        private filteringService: MultiSelectFilteringService,
        private searchService: MultiSelectSearchService,
        private translate: TranslateService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly pathFileService: PathFileService
    ) {}

    config(data: MultiSelectDataConfigModel): void {
        const { serviceName, queryParams } = Util.cloneDeep(data as MultiSelectDataConfigModel);
        const { service } = new ShortEntityListFactory(this.rest, serviceName, this.jsonConvertService, this.pathFileService);
        this.service = service;
        this.stateFacade.store.update({ queryParams: { ...queryParams, lang: this.translate.currentLang } });
    }

    get fetchData(): boolean {
        return this.stateFacade.value.fetchData;
    }

    set fetchData(value: boolean) {
        this.stateFacade.store.update({ fetchData: value });
    }

    stateQuery(elem: keyof MultiSelectBlockState): any {
        return this.stateFacade.query.select(elem);
    }

    loadOnScroll(nativeElement: Element): Observable<any> {
        return fromEvent(nativeElement, 'scroll').pipe(
            tap((elem: Event) => {
                const element: HTMLElement = elem.target as HTMLElement;
                if (element.offsetHeight === element.scrollHeight - element.scrollTop) {
                    this.filteringService.nextPage();
                }
            }),
            debounceTime(300)
        );
    }

    loadDynamicData(): Observable<any> {
        return combineLatest([this.stateFacade.query.select('queryParams'), this.stateFacade.query.select('fetchData')]).pipe(
            filter(([, fetchData]) => !!fetchData),
            tap(() => {
                this.stateFacade.store.setLoading(true);
            }),
            debounceTime(300),
            filter(([queryParams]) => {
                const check = this.fetchData && !Util.isEmpty(queryParams);
                if (!check) {
                    this.stateFacade.store.setLoading(false);
                }
                return check;
            }),
            switchMap(([queryParams]) => this.service.list({ queryParams })),
            tap(() => {
                if (this.searchService.isSearch) {
                    this.stateFacade.store.update({ items: [] });
                }
            }),
            tap(({ results, pagination }) => {
                if (this.stateFacade.query.getValue().items.length <= 0 || !this.stateFacade.query.getValue().pagination) {
                    this.stateFacade.store.update({ pagination });
                }

                if (this.stateFacade.query.getValue().items.length <= 0) {
                    this.stateFacade.store.update({ items: results });
                } else {
                    this.appendItems(results);
                }
            }),
            tap(() => {
                this.searchService.isSearch = false;
                this.stateFacade.store.setLoading(false);
            })
        );
    }

    appendItems(newItems: any[]): void {
        this.stateFacade.store.update({
            items: [...this.stateFacade.query.getValue().items, ...newItems]
        });
    }

    reload(fetchData: boolean): void {
        this.stateFacade.store.update((state) => ({
            ...state,
            items: [],
            fetchData
        }));
    }
}
