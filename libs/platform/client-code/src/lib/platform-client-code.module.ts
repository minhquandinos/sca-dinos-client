import { NgModule, Optional, SkipSelf } from '@angular/core';

import { INIT_CLIENT_CODE_YANDEX_METRICA } from './providers/init-client-code-yandex.metrica.provider';

@NgModule({
    providers: [INIT_CLIENT_CODE_YANDEX_METRICA]
})
export class PlatformClientCodeModule {
    constructor(@Optional() @SkipSelf() private platformClientCodeModule: PlatformClientCodeModule) {
        if (platformClientCodeModule) {
            throw new Error('PlatformClientCodeModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
