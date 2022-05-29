import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';

/*
 * @deprecated
 *
 * use akita Local Component State
 * */
@Injectable()
export abstract class BaseDataService<T> {
    protected _data$: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    readonly data$: Observable<T> = this._data$.asObservable();

    private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly loading$ = this._loading$.asObservable().pipe(map((loading) => !loading));

    private _reload$: Subject<void> = new Subject<void>();

    get data(): T {
        return this._data$.value;
    }

    set data(value: T) {
        this._data$.next(value);
    }

    setLoading(value: boolean): void {
        this._loading$.next(value);
    }

    reset(): void {
        this._data$.next(null);
    }

    update(value: { [K in keyof T]?: T[K] }): void {
        this._data$.next({
            ...this.data,
            ...value
        });
    }

    add(key: keyof T, value: unknown | unknown[], unshift: boolean = false): void {
        if (Array.isArray(this.data[key])) {
            const arr = this.data[key] as any;

            let newValue;
            if (Array.isArray(value)) {
                newValue = unshift ? [...value, ...arr] : [...arr, ...value];
            } else {
                newValue = unshift ? [value, ...arr] : [...arr, value];
            }

            this._data$.next({
                ...this.data,
                [key]: newValue
            });
        }
    }

    notFoundBy(key?: keyof T): Observable<boolean> {
        return this.data$.pipe(
            filter((data) => !!data),
            map((data: any) => {
                if (key) {
                    return !!data?.[key as any];
                }

                return !!data;
            })
        );
    }

    observable<O>(observable: Observable<O>): Observable<O> {
        this.setLoading(true);
        return this._reload$.pipe(
            startWith(''),
            switchMap(() => observable),
            tap(() => {
                this.setLoading(false);
            })
        );
    }

    reload(): void {
        this._reload$.next();
    }
}
