import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EndpointsModel } from './endpoints.model';

type EndpointsStoreType = Map<string, string>;

@Injectable({
    providedIn: 'root'
})
export class EndpointsStore {
    private _endpoints$: BehaviorSubject<EndpointsStoreType> = new BehaviorSubject<EndpointsStoreType>(new Map([]));

    readonly endpoints$ = this._endpoints$.asObservable();

    get endpoints(): EndpointsStoreType {
        return this._endpoints$.value;
    }

    set(endpoints: EndpointsModel): void {
        const map = this.endpoints;
        Object.entries(endpoints).forEach(([key, value]) => {
            if (map.has(key)) {
                map.delete(key);
                map.set(key, value);
            } else {
                map.set(key, value);
            }
        });

        this._endpoints$.next(map);
    }
}
