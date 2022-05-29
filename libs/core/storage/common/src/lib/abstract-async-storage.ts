import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AsyncStorageInterface } from './async-storage.interface';

export const STORAGE_KEY = 'SCALEO_LOCAL_STATE';

export abstract class AbstractAsyncStorage implements AsyncStorageInterface {
    protected readonly state$!: BehaviorSubject<Record<string, any>>;
    protected key = STORAGE_KEY;

    protected constructor(public readonly storage: Storage, protected readonly storageKey: string) {
        this.key = storageKey || `${STORAGE_KEY}_UNDEFINED`;
        this.state$ = new BehaviorSubject<Record<string, any>>(this.getLocalState());
    }

    get state(): Record<string, any> {
        return this.state$.getValue();
    }

    get length(): number {
        return Object.keys(this.state).length;
    }

    clear(): void {
        this.setState({});
    }

    getItem$<T = any>(key: string): Observable<T | null> {
        return this.state$.pipe(map((state) => state[key] ?? null));
    }

    getItem<T = any>(key: string): T | null;
    getItem<T = any>(key: string, elem?: keyof T): T[keyof T] | null;
    getItem<T = any>(key: string, elem?: any): T | null {
        if (elem) {
            return this.state$.value?.[key]?.[elem] || null;
        }

        return this.state$.value?.[key] || null;
    }

    getItems$<T = any>(keys: string[]): Observable<T> {
        return combineLatest(keys.map((key) => this.getItem$(key))) as any;
    }

    removeItem<T = any>(key: string): void;
    removeItem<T = any>(key: string, elem?: keyof T): void;
    removeItem<T = any>(key: string, elem?: any): void {
        const state = { ...this.state };
        if (key in state) {
            if (elem) {
                delete state?.[key]?.[elem];
            } else {
                delete state[key];
            }

            this.setState(state);
        }
    }

    removeItems(keys: string[]): void {
        const state = { ...this.state };

        for (const key of keys) {
            if (key in state) {
                delete state[key];
            }
        }

        this.setState(state);
    }

    setItem<T = any>(key: string, value: T | Partial<T>): void {
        const getItem = this.getItem(key);
        let newValue = value;
        if (getItem && typeof getItem === 'object') {
            newValue = {
                ...getItem,
                ...newValue
            };
        }

        this.setState({ ...this.state$.getValue(), [key]: newValue });
    }

    setItems<T extends Record<string, any> = Record<string, any>>(state: T): void {
        this.setState({ ...this.state$.getValue(), ...state });
    }

    protected setState(state: Record<string, any>): void {
        this.state$.next(state);
        this.setLocalState(state);
    }

    protected setLocalState(state: Record<string, any>): void {
        try {
            this.storage.setItem(this.key, JSON.stringify(state));
        } catch (error) {
            console.error(error);
        }
    }

    protected getLocalState(): Record<string, any> {
        const state = this.storage.getItem(this.key);

        return state ? JSON.parse(state) : {};
    }
}
