import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, switchMap, tap } from 'rxjs/operators';

import { ShortEntityListService, ShortEntityNameEnum, ShortSponsorModel } from '@scaleo/shared/data-access/short-entity-list';

import { BaseFind3Component } from '../../base-find3.component';

@Component({
    selector: 'app-find-sponsor',
    templateUrl: './find-sponsor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer): ControlContainer => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FindSponsorComponent extends BaseFind3Component<ShortSponsorModel> implements OnInit, AfterViewInit {
    @Input() itemLabel = 'title';

    @Input() itemValue = 'id';

    constructor(
        private readonly shortEntityListService: ShortEntityListService,
        protected parentF: FormGroupDirective,
        protected translate: TranslateService
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.items$ = this.fetch();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    fetch(): Observable<ShortSponsorModel[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((filters) => this.shortEntityListService.list(ShortEntityNameEnum.Sponsor, { queryParams: filters })),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements<ShortSponsorModel>(items.results, this.formName).map((filter: any) =>
                    this.shortEntityListService.list(ShortEntityNameEnum.Sponsor, { queryParams: filter }).pipe(pluck('results'))
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

    public customSearchFn(term: string, item: any): boolean {
        term = term.toLocaleLowerCase();
        return (
            item.company.toLocaleLowerCase().indexOf(term) > -1 ||
            item.firstname.toLocaleLowerCase().indexOf(term) > -1 ||
            item.lastname.toLocaleLowerCase().indexOf(term) > -1 ||
            String(item.id).indexOf(term) > -1
        );
    }
}
