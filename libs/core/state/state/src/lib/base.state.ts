import { Query, Store, StoreConfigOptions, UpdateStateCallback } from '@datorama/akita';
import { map, Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

export type BaseInitialState<T> = { loading: boolean } & Partial<T>;

export const createBaseInitialState = <T>(state: T): BaseInitialState<T> => ({ loading: false, ...state });

export abstract class BaseStateStore<T> extends Store<T> {
    protected constructor(protected initialState: Partial<T>, protected options: Partial<StoreConfigOptions> = {}) {
        super(initialState, options);
    }
}

export abstract class BaseStateQuery<T> extends Query<T> {
    readonly loading$ = this.selectLoading();

    readonly isLoad$ = this.loading$.pipe(map((loading) => !loading));

    protected constructor(protected store: Store<T>) {
        super(store);
    }
}

export abstract class BaseStateService<T = unknown> {
    private _reload$: Subject<void> = new Subject<void>();

    protected constructor(protected store: BaseStateStore<T>, protected query: BaseStateQuery<T>) {}

    setLoading(loading: boolean): void {
        this.store.setLoading(loading);
    }

    reload(): void {
        return this._reload$.next();
    }

    observable<O>(observable: Observable<O>): Observable<O> {
        this.store.setLoading(true);
        return this._reload$.pipe(
            startWith(''),
            switchMap(() => observable),
            tap(() => {
                this.store.setLoading(false);
            })
        );
    }

    update(stateCallback: UpdateStateCallback<T>): any;
    update(state: Partial<T>): void;
    update(state: any): void {
        this.store.update(state);
    }
}
