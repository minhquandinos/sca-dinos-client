import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    PlatformListModel,
    PlatformListQuery,
    PlatformListsFormatInterface,
    PlatformListsService
} from '@scaleo/platform/list/access-data';

import { BaseFind3Component } from '../../base-find3.component';
import { FindPlatformListModel } from './models/find-platform-list.model';
import { FindPlatformListTranslatePipe } from './pipes/find-platform-list-translate.pipe';

@DynamicComponentLookup('FindPlatformListComponent')
@Component({
    selector: 'app-find-platform-list',
    templateUrl: './find-platform-list.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer): ControlContainer => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [FindPlatformListTranslatePipe, UnsubscribeService]
})
export class FindPlatformListComponent extends BaseFind3Component<PlatformListsFormatInterface> implements OnInit, AfterViewInit {
    @Input() set platformList(platformList: keyof FindPlatformListModel) {
        if (platformList) {
            this._platformList$.next(platformList);
        }
    }

    @Input() firstElement: PlatformListsFormatInterface | BaseObjectModel;

    @Input() disableTranslate = false;

    @Input() itemLabel = 'title';

    @Input() itemValue = 'id';

    @Input() searchable = true;

    @Input() labelShowId = false;

    @Input() hideSelected = false;

    private readonly _platformList$: BehaviorSubject<keyof FindPlatformListModel> = new BehaviorSubject<keyof FindPlatformListModel>(null);

    private readonly platformList$ = this._platformList$.pipe(
        filter((list) => !!list),
        distinctUntilChanged()
    );

    constructor(
        private platformListsService: PlatformListsService,
        private platform: PlatformListQuery,
        protected parentF: FormGroupDirective,
        protected translate: TranslateService,
        private findPlatformListTranslatePipe: FindPlatformListTranslatePipe,
        private readonly unsubscribe: UnsubscribeService
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        this.init();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    private init(): void {
        this.platformList$
            .pipe(
                debounceTime(0),
                switchMap((platformList) => this.platformListsService.platformListsNew(platformList)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
        this.items$ = this.filteredItems$();
    }

    filteredItems$(): Observable<PlatformListsFormatInterface[]> {
        return combineLatest([this.fetch(), this.updateStream$.pipe(startWith(''))])
            .pipe(
                map(([items]) => items),
                filter((items) => !!items),
                this.filterItemsOperator()
            )
            .pipe(
                switchMap((items) =>
                    this.findPlatformListTranslatePipe.transform(
                        items,
                        this._platformList$.value,
                        this.itemIncrement,
                        this.disableTranslate
                    )
                ),
                map((res) => res as PlatformListsFormatInterface[])
            );
    }

    private get getPlatformListItemValue(): keyof FindPlatformListModel {
        return this._platformList$.value;
    }

    fetch(): Observable<PlatformListsFormatInterface[]> {
        return this.platformList$.pipe(
            mergeMap((platformList) => this.platform.list$([platformList])),
            debounceTime(100),
            tap(() => {
                this.loading = true;
            }),
            map((list: PlatformListModel) => list[this.getPlatformListItemValue]),
            map((list: any[]) => {
                if (this.firstElement && list) {
                    return [this.firstElement, ...list];
                }

                return list;
            }),
            tap(() => {
                this.loading = false;
            })
        );
    }
}
