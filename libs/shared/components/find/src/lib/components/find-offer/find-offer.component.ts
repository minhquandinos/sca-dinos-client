import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, shareReplay } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, startWith, switchMap, tap } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { ShortEntityListService, ShortEntityNameEnum, ShortOfferModel } from '@scaleo/shared/data-access/short-entity-list';

import { BaseFind3Component } from '../../base-find3.component';
import { BaseFindRequestModel } from '../../models/base-find.model';

@DynamicComponentLookup('FindOfferComponent')
@Component({
    selector: 'app-find-offer',
    templateUrl: './find-offer.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FindOfferComponent extends BaseFind3Component<ShortOfferModel> implements OnInit, AfterViewInit, OnChanges {
    @Input() itemLabel = 'title';

    @Input() hideSelected = false;

    @Input() clearable = false;

    @Input() status: string;

    // TODO provide to extended class ControlContainer, and fixed findEmptyElements method
    // TODO change this.parentF.form.get(this.formNameArray)?.value[this.index]?.[this.formName]
    // TODO to ControlContainer.path[0]
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
            sortDirection: 'asc',
            exact: '',
            status: this.status || ''
        });
        this.items$ = this.filteredItems$();
        // this.removeEmptyValueFromControl2();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }

    filteredItems$(): Observable<ShortOfferModel[]> {
        return combineLatest([this.fetch(), this.updateStream$.pipe(startWith(''))]).pipe(
            map(([items]) => items),
            this.filterItemsOperator()
        );
    }

    fetch(): Observable<ShortOfferModel[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((filters) => this.shortEntityListService.list(ShortEntityNameEnum.Offers, { queryParams: filters })),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements(items.results, this.formName).map((filter: any) =>
                    this.shortEntityListService.list(ShortEntityNameEnum.Offers, { queryParams: filter }).pipe(pluck('results'))
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
        ) as Observable<ShortOfferModel[]>;
    }

    customSearchFn(term: string, item: ShortOfferModel): any {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term || term === `#${item.id}`;
    }
}
