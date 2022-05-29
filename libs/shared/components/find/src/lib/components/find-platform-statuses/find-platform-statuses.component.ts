import { AfterViewInit, Component, HostBinding, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable, of, switchMap } from 'rxjs';
import { debounceTime, filter, map, pluck, startWith, takeUntil, tap } from 'rxjs/operators';

import { SortByType } from '@scaleo/core/data';
import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    PlatformListQuery,
    PlatformListsFormatInterface,
    PlatformListsService,
    ScaleoStatusesType
} from '@scaleo/platform/list/access-data';
import { CustomTranslatePipe } from '@scaleo/shared/pipes';

import { BaseFind3Component } from '../../base-find3.component';
import { FindPlatformStatusesFirstElementModel } from './models/find-platform-statuses-first-element.model';

type StatusListType = keyof Record<ScaleoStatusesType, string> | PlatformListsFormatInterface[];

@DynamicComponentLookup('FindPlatformStatusesComponent')
@Component({
    selector: 'app-find-platform-statuses',
    templateUrl: './find-platform-statuses.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer): ControlContainer => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    providers: [CustomTranslatePipe, UnsubscribeService]
})
export class FindPlatformStatusesComponent extends BaseFind3Component<PlatformListsFormatInterface> implements OnInit, AfterViewInit {
    @HostBinding('class')
    hostClass = 'find-platform-statuses';

    @Input() set statusList(value: StatusListType) {
        if (value) {
            this._statusList$.next(value);
        }
    }

    @Input() customTranslateKey: string;

    @Input() firstElement: FindPlatformStatusesFirstElementModel;

    @Input() itemLabel = 'title';

    @Input() itemValue = 'id';

    @Input() hideDot = false;

    @Input() hideDotTooltip = false;

    @Input() keySort: string;

    @Input() hideSelected = false;

    @Input() sortDirection: SortByType = 'asc';

    private _statusList$: BehaviorSubject<StatusListType> = new BehaviorSubject<StatusListType>(undefined);

    constructor(
        private platformListsService: PlatformListsService,
        private platform: PlatformListQuery,
        protected parentF: FormGroupDirective,
        protected translate: TranslateService,
        private readonly unsubscribe: UnsubscribeService
    ) {
        super(parentF, translate);
    }

    ngOnInit(): void {
        if (Array.isArray(this._statusList$.value)) {
            this.items$ = of(this._statusList$.value);
        } else {
            this._statusList$
                .pipe(
                    filter((list) => !!list),
                    switchMap((list) => this.platformListsService.platformListsNew(list as string)),
                    takeUntil(this.unsubscribe)
                )
                .subscribe();
            this.items$ = this.filteredItems$();
        }
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    get statusListValue(): StatusListType {
        return this._statusList$.value;
    }

    filteredItems$(): Observable<PlatformListsFormatInterface[]> {
        return combineLatest([this.fetch(), this.updateStream$.pipe(startWith(''))]).pipe(
            map(([items]) => items),
            this.filterItemsOperator()
        );
    }

    fetch(): Observable<PlatformListsFormatInterface[]> {
        return this._statusList$.pipe(
            filter((list) => !!list),
            switchMap((list) => {
                return this.platform.list$([list as ScaleoStatusesType]).pipe(
                    debounceTime(300),
                    tap(() => {
                        this.loading = true;
                    }),
                    pluck(list as any),
                    map((statusList: any[]) => {
                        if (!statusList?.length) {
                            return [];
                        }
                        let newStatusList = statusList;
                        if (this.firstElement) {
                            newStatusList = [this.firstElement, ...newStatusList];
                        }

                        return this.keySort ? this.sort(newStatusList) : newStatusList;
                    }),
                    // switchMap((list) =>
                    //     this.customTranslateKey ? this.customTranslate.transform(list, this.customTranslateKey) : of(list)
                    // ),
                    tap(() => {
                        this.loading = false;
                    })
                );
            })
        );
    }

    private sort<T>(arr: T[]): T[] {
        return arr.sort((a: any, b: any) => {
            if (this.sortDirection === 'desc') {
                return a?.[this.keySort] < b[this.keySort] ? 1 : -1;
            }
            return a[this.keySort] > b[this.keySort] ? 1 : -1;
        });
    }
}
