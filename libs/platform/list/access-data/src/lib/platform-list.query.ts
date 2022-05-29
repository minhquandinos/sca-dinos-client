import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlatformListModel } from './models/platform-list.model';
import { PlatformListState, PlatformListStore } from './platform-list.store';

@Injectable({ providedIn: 'root' })
export class PlatformListQuery extends Query<PlatformListState> {
    constructor(protected store: PlatformListStore) {
        super(store);
    }

    list$(params: string[]): Observable<PlatformListModel> {
        return this.select().pipe(
            map((query) => {
                const response: PlatformListModel = {};
                params.forEach((elem) => {
                    response[elem as keyof PlatformListModel] = query[elem as keyof PlatformListModel] as any;
                });
                return response;
            })
        );
    }

    item<K extends keyof PlatformListModel>(paramName: K): PlatformListModel[K] {
        return this.getValue()?.[paramName] || [];
    }

    item$<K extends keyof PlatformListModel>(paramName: K): Observable<PlatformListModel[K]> {
        return this.select(paramName);
    }

    list(params: Array<keyof PlatformListModel>): PlatformListModel {
        const all = this.getValue();

        let response: PlatformListModel = {};

        params.forEach((elem) => {
            response = {
                ...response,
                ...all[elem]
            } as any;
        });

        return response;
    }
}
