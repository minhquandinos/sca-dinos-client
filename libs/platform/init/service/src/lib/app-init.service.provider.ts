import { APP_INITIALIZER } from '@angular/core';

import { AppInitService } from './app-init.service';

export function initializeApp(appInit: AppInitService) {
    return async (): Promise<any> => {
        await appInit.init();
    };
}

export const PLATFORM_INIT = {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [AppInitService],
    multi: true
};
