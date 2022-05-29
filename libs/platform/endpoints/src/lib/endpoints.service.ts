import { Injectable, InjectionToken } from '@angular/core';

import { EnvService } from '@scaleo/core/services/env';

import { EndpointsModel } from './endpoints.model';
import { EndpointsStore } from './endpoints.store';

export const END_POINTS = new InjectionToken('END_POINTS', {
    providedIn: 'root',
    factory: () => {
        return {};
    }
});

@Injectable({
    providedIn: 'root'
})
export class EndpointsService {
    constructor(private readonly env: EnvService, private readonly store: EndpointsStore) {}

    get endpoints(): EndpointsModel {
        const endpoints = [...this.store.endpoints.entries()].map(([key, value]) => {
            return [key, this.env.serverUrl + value];
        });

        return Object.fromEntries(endpoints);
    }

    endpoint(key: string): string | undefined {
        const endpoint = this.store.endpoints.get(key);
        if (!endpoint) {
            return undefined;
        }
        return this.env.serverUrl + endpoint;
    }

    // resolve(url: string) {
    //     return `${this._baseUrl}${url}`;
    // }
}
