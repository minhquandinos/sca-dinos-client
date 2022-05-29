import { APP_INITIALIZER, Provider } from '@angular/core';

import { InitClinetCodeYandexMetricaService } from './init-clinet-code-yandex-metrica.service';

function initMetrica(metrika: InitClinetCodeYandexMetricaService) {
    return (): void => {
        metrika.init();
    };
}

export const INIT_CLIENT_CODE_YANDEX_METRICA: Provider[] = [
    InitClinetCodeYandexMetricaService,
    {
        provide: APP_INITIALIZER,
        useFactory: initMetrica,
        deps: [InitClinetCodeYandexMetricaService],
        multi: true
    }
];
