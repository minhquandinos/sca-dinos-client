import { AfterViewInit, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, startWith, switchMap, tap } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';
import {
    ShortEntityListService,
    ShortEntityNameEnum,
    ShortManagerModel,
    ShortManagerQueryParamDto
} from '@scaleo/shared/data-access/short-entity-list';

import { BaseFind3Component } from '../../base-find3.component';
import { BaseFindRequestModel } from '../../models/base-find.model';

@DynamicComponentLookup('FindManagersComponent')
@Component({
    selector: 'app-find-managers',
    templateUrl: './find-managers.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FindManagersComponent extends BaseFind3Component<ShortManagerModel> implements OnInit, AfterViewInit {
    @Input() itemLabel = 'name';

    @Input() queryParams: ShortManagerQueryParamDto;

    @Input() itemTemplate: TemplateRef<any>;

    @Input() searchable = true;

    constructor(
        protected parentF: FormGroupDirective,
        protected translate: TranslateService,
        private readonly shortEntityListService: ShortEntityListService
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.params$ = new BehaviorSubject<BaseFindRequestModel>({
            ...this.params$.value,
            status: PlatformListsStatusesNameEnum.Active
        });
        this.items$ = this.filteredItems$();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    private filteredItems$(): Observable<ShortManagerModel[]> {
        return combineLatest([this.fetch(), this.updateStream$.pipe(startWith(''))]).pipe(
            map(([items]) => items),
            this.filterItemsOperator()
        );
    }

    fetch(): Observable<ShortManagerModel[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((filters) => {
                return this.shortEntityListService.list(ShortEntityNameEnum.Managers, {
                    queryParams: { ...filters, ...this.queryParams }
                });
            }),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements(items.results, this.formName).map((filter: any) =>
                    this.shortEntityListService
                        .list(ShortEntityNameEnum.Managers, {
                            queryParams: { ...filter, ...this.queryParams }
                        })
                        .pipe(pluck('results'))
                );
                return forkJoin([of(items.results), ...emptyElements]);
            }),
            map((res) => res.flat()),
            scan((acc, items) => this.unique(acc, items, 'id')),
            tap(() => {
                this.endFetch();
            })
        );
    }

    customSearchFn(term: string | number, item: ShortManagerModel): any {
        const searchText = term.toString().toLowerCase();
        return item.title.toLowerCase().indexOf(searchText) > -1 || item.id === +term;
    }
}
