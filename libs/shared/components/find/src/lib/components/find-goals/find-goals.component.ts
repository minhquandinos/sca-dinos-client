import { AfterViewInit, Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, shareReplay } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, scan, switchMap, tap } from 'rxjs/operators';

import { BaseObjectModel, ShortResponseInterface } from '@scaleo/core/data';

import { BaseFind3Component } from '../../base-find3.component';
import { GoalsService } from './find-goals.service';

// import { GoalShortInterface } from '../../../../core/models/goal.interface';

@Component({
    selector: 'app-find-goals',
    templateUrl: './find-goals.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer): ControlContainer => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FindGoalsComponent extends BaseFind3Component<BaseObjectModel> implements OnInit, AfterViewInit {
    @Input() hideTypeGoal: number = null;

    @Input() titleZeroItem = 'none_goals';

    @Input() firstItem = true;

    @Input() firstItemObject: BaseObjectModel;

    @Input() selectedFirstElement: boolean;

    @Input() set offerId(id: number) {
        this._offerId$.next(+id || undefined);
        this.offerIdChanged = true;
    }

    private _offerId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    private offerIdChanged: boolean;

    constructor(private goalsService: GoalsService, protected parentForm: FormGroupDirective, protected translate: TranslateService) {
        super(parentForm, translate);
    }

    ngOnInit(): void {
        this.items$ = this.fetch();
        // this.removeEmptyValueFromControl2();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    fetch(): Observable<any> {
        return combineLatest([this.params$, this._offerId$]).pipe(
            tap(() => {
                this.startFetch();
            }),
            debounceTime(300),
            distinctUntilChanged(),
            tap(([, offerId]) => {
                if (!offerId) {
                    this.loading = false;
                }
            }),
            switchMap(([filters, offerId]) => {
                if (offerId) {
                    return this.goalsService.index(offerId, filters);
                }
                return of({
                    results: [],
                    pagination: null
                });
            }),
            tap((res) => {
                this.pagination = res.pagination;
            }),
            switchMap((items) => {
                const emptyElements = this.getEmptyElements(items.results, this.formName).map((flt) =>
                    this.goalsService.index(this._offerId, flt).pipe(pluck('results'))
                );
                return forkJoin([of(items.results), ...emptyElements]);
            }),
            map((res) => res.flat()),
            scan((acc, items) => {
                if (this.offerIdChanged) {
                    this.offerIdChanged = false;
                    return items;
                }
                return this.unique(acc, items, 'id');
            }),
            map((goals) => {
                if (this.hideTypeGoal) {
                    goals = goals.filter((goal: BaseObjectModel) => +goal.type !== this.hideTypeGoal);
                }
                return goals;
            }),
            tap((goals) => {
                if (this.firstItem && this._offerId) {
                    const defaultFirstItem = {
                        id: 0,
                        title: this.titleZeroItem,
                        type: 0
                    };
                    const firstItem = this.firstItemObject ? this.firstItemObject : defaultFirstItem;
                    goals.unshift(firstItem);
                }

                if (this.selectedFirstElement) {
                    const currentValue = this.parentForm.form.get(this.formName).value;
                    if (!currentValue) {
                        const newValue = this.itemValue ? goals[0][this.itemValue] : goals[0];
                        this.parentForm.form.get(this.formName).setValue(newValue);
                    }
                }
                return goals;
            }),
            this.removeEmptyValueFromControl(),
            tap(() => {
                this.endFetch();
            }),
            shareReplay()
        );
    }

    customSearchFn(term: string, item: ShortResponseInterface): any {
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.id === +term || term === `#${item.id}`;
    }

    private get _offerId(): number {
        return this._offerId$.value;
    }

    resetValue(): void {
        this.parentForm.form.get(this.formName).reset();
    }
}
