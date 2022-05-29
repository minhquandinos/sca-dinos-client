import { AfterViewInit, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, startWith, switchMap, tap } from 'rxjs/operators';

import { ShortResponseInterface } from '@scaleo/core/data';
import { DynamicComponentLookup } from '@scaleo/core/decorators/common';

import { BaseFind3Component } from '../../base-find3.component';
import { BaseFindRequestModel } from '../../models/base-find.model';
import { FindInvoicesApi } from './api/find-invoices.api';
import { FindInvoicesService } from './services/find-invoices.service';

@DynamicComponentLookup('FindInvoicesComponent')
@Component({
    selector: 'app-find-invoices',
    templateUrl: './find-invoices.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    providers: [FindInvoicesApi, FindInvoicesService]
})
export class FindInvoicesComponent extends BaseFind3Component<ShortResponseInterface> implements OnInit, AfterViewInit {
    @Input() itemLabel = 'title';

    @Input() itemValue = 'id';

    params$ = new BehaviorSubject<BaseFindRequestModel>({
        perPage: 20,
        page: 1,
        search: '',
        sortDirection: 'desc',
        sortField: 'id'
    });

    constructor(
        protected parentF: FormGroupDirective,
        protected translate: TranslateService,
        private invoicesService: FindInvoicesService
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.items$ = this.filteredItems$();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    private filteredItems$(): Observable<ShortResponseInterface[]> {
        return combineLatest([this.fetch(), this.updateStream$.pipe(startWith(''))]).pipe(
            map(([items]) => items),
            this.filterItemsOperator()
        );
    }

    fetch(): Observable<ShortResponseInterface[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((filters) => this.invoicesService.index(filters)),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements<BaseFindRequestModel>(items.results, this.formName).map((filter) =>
                    this.invoicesService.index(filter).pipe(pluck('results'))
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

    customSearchFn(term: string, item: ShortResponseInterface) {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term;
    }
}
