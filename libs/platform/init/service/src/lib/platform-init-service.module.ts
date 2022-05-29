import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { ENV_DEV_SERVER_URL_TOKEN } from '@scaleo/core/services/env';
import {
    PLATFORM_ENVIRONMENT_DEV,
    PLATFORM_ENVIRONMENT_PROD,
    PLATFORM_ENVIRONMENT_TOKEN,
    PlatformEnvironmentModel
} from '@scaleo/platform/environment';
import { PLATFORM_PERMISSIONS_PROVIDER } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE_PROVIDER } from '@scaleo/platform-permission-plan-common';

import { PLATFORM_INIT } from './app-init.service.provider';

const ENV_PROVIDER: Provider = {
    provide: ENV_DEV_SERVER_URL_TOKEN,
    useFactory: (env: PlatformEnvironmentModel) => env.serverUrl || 'https://dev-track.scaleo.io',
    deps: [PLATFORM_ENVIRONMENT_TOKEN]
};

@NgModule({
    imports: [CommonModule]
})
export class PlatformInitServiceModule {
    static forRoot(options: { isProduction: boolean }): ModuleWithProviders<any> {
        return {
            ngModule: PlatformInitServiceModule,
            providers: [
                PLATFORM_PLAN_FEATURE_PROVIDER,
                {
                    provide: PLATFORM_ENVIRONMENT_TOKEN,
                    useFactory: () => {
                        return options?.isProduction ? PLATFORM_ENVIRONMENT_PROD : PLATFORM_ENVIRONMENT_DEV;
                    }
                },
                ENV_PROVIDER,
                PLATFORM_INIT,
                RestApiService,
                PLATFORM_PERMISSIONS_PROVIDER
            ]
        };
    }
}
