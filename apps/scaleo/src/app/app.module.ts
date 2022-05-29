import { HttpClient } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import * as Hammer from 'hammerjs';
import { IntercomModule } from 'ng-intercom';
import { NgxPermissionsModule } from 'ngx-permissions';
import { QuillModule } from 'ngx-quill';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { AuthForbiddenModule } from '@scaleo/auth/forbidden/interceptor';
import { AuthJwtModule } from '@scaleo/auth/jwt/interceptor';
import { AdblockModule } from '@scaleo/core/adblock/service';
import { InternetConnectionModule } from '@scaleo/core/connection/interceptor';
import { ServiceLocator } from '@scaleo/core/locator/service';
import { MediaWatcherModule } from '@scaleo/core/media-watcher/service';
import { SharedModule } from '@scaleo/core/shared/module';
import { ASYNC_STORAGE_PROVIDER } from '@scaleo/core/storage/common';
import { TrackingRequestModule } from '@scaleo/core/tracking-request/interceptor';
import { PlatformBrandingModule } from '@scaleo/platform/branding';
import { PlatformClientCodeModule } from '@scaleo/platform/client-code';
import { DateWatcherModule } from '@scaleo/platform/date/watcher';
import { BASE_API_ENDPOINTS, EndpointsModule } from '@scaleo/platform/endpoints';
import { PlatformInitServiceModule } from '@scaleo/platform/init/service';
import { PlatformLanguageInterceptorModule } from '@scaleo/platform/language/interceptors';
import { PlatformVersionModule } from '@scaleo/platform/version';
import { PreloadModule } from '@scaleo/shared/components2/preload';
import { Modal3Module } from '@scaleo/ui-kit/components/modal3';
import { UiCustomFlexLayoutModule } from '@scaleo/ui-kit/custom-flex-layout';
import { UiToastrModule } from '@scaleo/ui-kit/elements';
import { ScaleoLayoutModule } from '@scaleo/ui-kit/layout';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export const httpLoaderFactory = (http: HttpClient): any =>
    new MultiTranslateHttpLoader(http, [
        { prefix: './assets/i18n/shared-aff-adv/', suffix: `.json` },
        { prefix: './assets/i18n/shared/', suffix: `.json` },
        { prefix: './assets/i18n/shared/activity-log/', suffix: `.json` },
        { prefix: './assets/i18n/shared/main-navigation/', suffix: `.json` },
        { prefix: './assets/i18n/shared/dashboard/', suffix: `.json` },
        { prefix: './assets/i18n/shared/table/', suffix: `.json` },
        { prefix: './assets/i18n/shared/reports/', suffix: `.json` },
        { prefix: './assets/i18n/offer/', suffix: `.json` },
        { prefix: './assets/i18n/billing/', suffix: `.json` },
        { prefix: './assets/i18n/outbound/', suffix: `.json` },
        { prefix: './assets/i18n/structured/', suffix: `.json` },
        { prefix: './assets/i18n/errors/', suffix: `.json` },
        { prefix: './assets/i18n/', suffix: `.json` }
    ]);

// making hammer config (3)
export class ScaleoHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        pan: { direction: Hammer.DIRECTION_HORIZONTAL },
        swipe: { enable: false },
        pinch: { enable: false },
        rotate: { enable: false }
    };

    options = <any>{
        cssProps: {
            userSelect: false
        },
        inputClass: Hammer.TouchInput
    };
}

@NgModule({
    declarations: [AppComponent], // SwitchRoleComponent
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HammerModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        EndpointsModule.forRoot({ endpoints: BASE_API_ENDPOINTS }),
        PlatformInitServiceModule.forRoot({ isProduction: environment.production }),
        PlatformBrandingModule,
        MediaWatcherModule,
        PlatformClientCodeModule,
        DateWatcherModule,
        InternetConnectionModule,
        TrackingRequestModule,
        AuthForbiddenModule,
        AdblockModule,
        AuthJwtModule,
        SharedModule,
        // AuthModule,
        UiToastrModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: false
        }),
        Modal3Module.forRoot(),
        NgxPermissionsModule.forRoot(),
        PreloadModule,
        environment.production ? [] : AkitaNgDevtools.forRoot(),
        environment.production ? ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) : [],
        IntercomModule,
        ScaleoLayoutModule,
        UiCustomFlexLayoutModule,
        AkitaNgEffectsModule.forRoot([]),
        QuillModule.forRoot(),
        PlatformLanguageInterceptorModule,
        PlatformVersionModule
    ],
    providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: ScaleoHammerConfig }, ASYNC_STORAGE_PROVIDER],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private readonly _injector: Injector) {
        ServiceLocator.injector = this._injector;
        (window as any)['__persist_role'] = 'null';
    }
}
