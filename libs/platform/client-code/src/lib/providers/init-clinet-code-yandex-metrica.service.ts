import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { filter, pluck, tap } from 'rxjs/operators';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

import { BaseClientCode } from '../base-client-code';
import { ClientCodeInterface } from '../client-code.interface';

@Injectable()
export class InitClinetCodeYandexMetricaService extends BaseClientCode implements ClientCodeInterface {
    constructor(private platformSettingsQuery: PlatformSettingsQuery) {
        super();
    }

    async init(): Promise<any> {
        try {
            await firstValueFrom(
                this.platformSettingsQuery.settings$.pipe(
                    pluck('yandexMetrikaCode'),
                    filter((code) => code),
                    tap((code) => {
                        if (code) {
                            this.insertDom(this.script);
                        }
                    })
                )
            );
        } catch (e) {
            console.log(e);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    insert(): void {}

    get script(): string {
        return `
            <!-- Yandex.Metrika counter -->
            <script type="text/javascript" >
               (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
               m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
               (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

               ym(64887385, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
               });
            </script>
            <noscript><div><img src="https://mc.yandex.ru/watch/64887385" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
            <!-- /Yandex.Metrika counter -->
        `;
    }
}
