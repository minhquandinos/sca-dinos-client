import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, forkJoin, Observable, of, shareReplay } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, switchMap, tap } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { ShortAdvertiserModel, ShortEntityListService, ShortEntityNameEnum } from '@scaleo/shared/data-access/short-entity-list';

import { BaseFind3Component } from '../../base-find3.component';
import { BaseFindRequestModel } from '../../models/base-find.model';

@DynamicComponentLookup('FindAdvertisersComponent')
@Component({
    selector: 'app-find-advertisers',
    templateUrl: './find-advertisers.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FindAdvertisersComponent extends BaseFind3Component<ShortAdvertiserModel> implements OnInit, AfterViewInit {
    @Input() itemLabel = 'title';

    @Input() itemValue = 'id';

    @Input() status: string;

    constructor(
        private readonly shortEntityListService: ShortEntityListService,
        protected parentF: FormGroupDirective,
        protected translate: TranslateService
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.params$ = new BehaviorSubject<BaseFindRequestModel>({
            perPage: 20,
            page: 1,
            search: '',
            exact: '',
            status: this.status === 'active' ? this.status : ''
        });
        this.items$ = this.fetch();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    customSearchFn(term: string, item: ShortAdvertiserModel): any {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term || term === `#${item.id}`;
    }

    fetch(): Observable<ShortAdvertiserModel[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((filters) => this.shortEntityListService.list(ShortEntityNameEnum.Advertisers, { queryParams: filters })),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements(items.results, this.formName).map((filter: any) =>
                    this.shortEntityListService.list(ShortEntityNameEnum.Advertisers, { queryParams: filter }).pipe(pluck('results'))
                );
                return forkJoin([of(items.results), ...emptyElements]);
            }),
            map((res) => res.flat()),
            scan((acc, items) => this.unique(acc, items, 'id')),
            this.appendFirstElementOperator(),
            this.removeEmptyValueFromControl(),
            tap(() => {
                this.endFetch();
            }),
            shareReplay()
        ) as Observable<ShortAdvertiserModel[]>;
    }
}
