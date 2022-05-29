import { CommonModule } from '@angular/common';
import { Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { END_POINTS } from './endpoints.service';
import { EndpointsStore } from './endpoints.store';

@NgModule({
    imports: [CommonModule],
    providers: []
})
export class EndpointsModule {
    constructor(@Inject(END_POINTS) private readonly api: unknown) {}

    static forRoot<T>(options: { endpoints: T }): ModuleWithProviders<EndpointsModule> {
        return {
            ngModule: EndpointsModule,
            providers: [
                {
                    provide: END_POINTS,
                    useFactory: (endpointsStore: EndpointsStore) => {
                        endpointsStore.set(options?.endpoints || {});
                    },
                    deps: [EndpointsStore]
                }
            ]
        };
    }

    static forChild<T>(options: { endpoints: T }): ModuleWithProviders<EndpointsModule> {
        return {
            ngModule: EndpointsModule,
            providers: [
                {
                    provide: END_POINTS,
                    useFactory: (endpointsStore: EndpointsStore) => {
                        endpointsStore.set(options?.endpoints || {});
                    },
                    deps: [EndpointsStore]
                }
            ]
        };
    }
}
