import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, switchMap, tap } from 'rxjs/operators';

import { ShortEntityListService, ShortEntityNameEnum, ShortOfferLandingPageModel } from '@scaleo/shared/data-access/short-entity-list';

import { BaseFind3Component } from '../../base-find3.component';

@Component({
    selector: 'app-find-landing-page',
    templateUrl: './find-landing-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer): ControlContainer => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FindLandingPageComponent extends BaseFind3Component<ShortOfferLandingPageModel> implements OnInit, AfterViewInit {
    @Input() itemLabel = 'title';

    @Input() itemValue = 'id';

    @Input() offerId: number;

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

    fetch(): Observable<ShortOfferLandingPageModel[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((queryParams) =>
                this.shortEntityListService.list(ShortEntityNameEnum.LandingPage, { ...queryParams, offerId: this.offerId })
            ),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements<ShortOfferLandingPageModel>(items.results, this.formName).map((queryParams) =>
                    this.shortEntityListService
                        .list(ShortEntityNameEnum.LandingPage, { ...queryParams, offerId: this.offerId })
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
}
