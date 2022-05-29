import { AfterViewInit, Component, Inject, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, defer, forkJoin, Observable, of, shareReplay } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, startWith, switchMap, tap } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ShortAffiliateModel, ShortEntityListService, ShortEntityNameEnum } from '@scaleo/shared/data-access/short-entity-list';

import { BaseFind3Component } from '../../base-find3.component';

@DynamicComponentLookup('FindAffiliatesComponent')
@Component({
    selector: 'app-find-affiliates',
    templateUrl: './find-affiliates.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FindAffiliatesComponent extends BaseFind3Component<ShortAffiliateModel> implements OnInit, AfterViewInit {
    @Input() itemLabel = 'title';

    constructor(
        private readonly shortEntityListService: ShortEntityListService,
        protected parentF: FormGroupDirective,
        protected translate: TranslateService,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.items$ = this.filteredItems$();
        // this.removeEmptyValueFromControl2();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    filteredItems$(): Observable<ShortAffiliateModel[]> {
        const check = this.checkPermissionService.check(this.permissions.canAccessAffiliates);
        const fetch$ = defer(() => {
            return check ? this.fetch() : this.fetchFirstActive$;
        });

        return combineLatest([fetch$, this.updateStream$.pipe(startWith(''))]).pipe(
            map(([items]) => items),
            this.filterItemsOperator()
        );
    }

    get fetchFirstActive$(): Observable<ShortAffiliateModel[]> {
        return this.shortEntityListService.list(ShortEntityNameEnum.ActiveAffiliate);
    }

    fetch(): Observable<ShortAffiliateModel[]> {
        return this.params$.pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((filters) => this.shortEntityListService.list(ShortEntityNameEnum.Affiliates, { queryParams: filters })),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements(items.results, this.formName).map((filter: any) =>
                    this.shortEntityListService.list(ShortEntityNameEnum.Affiliates, { queryParams: filter }).pipe(pluck('results'))
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
        ) as Observable<ShortAffiliateModel[]>;
    }

    customSearchFn(term: string, item: ShortAffiliateModel) {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term || term === `#${item.id}`;
    }
}
