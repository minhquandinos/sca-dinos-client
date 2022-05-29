import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

@Component({ template: '' })
export abstract class BaseTopComponent<T> {
    @Input() trigger$: Subject<void>;

    @Input() date$: Observable<CustomDateRangeModel>;

    @Input() period: string;

    // @Input() revenueKey: 'payout' | 'total_payout' | 'total_revenue' = 'total_revenue';

    headers: UiTableHeaderInterface[] = [];

    private _items$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    readonly items$ = this._items$.asObservable();

    readonly itemsLength$: Observable<number> = this._items$.pipe(map((items) => items?.length || 0));

    readonly notFound$: Observable<boolean> = this._items$.pipe(map((value) => !value?.length));

    isLoad: boolean;

    maxRevenueValue: number;

    abstract toReport(): void;

    getMaxRevenueValue<K extends keyof T>(items: T[], key: K): number {
        const maxValue = [...items].sort((a, b) => (+a[key] > +b[key] ? -1 : 1));

        return maxValue.length > 0 ? +maxValue.shift()[key] : 0;
    }

    set items(items: T[]) {
        this._items$.next(items);
    }
}
