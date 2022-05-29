import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PreloadService } from '@scaleo/core/preload/service';

@Component({
    selector: 'app-preload',
    template: `
        <div class="app-load" *ngIf="appLoaded$ | async" [@fadeInOut]>
            <ui-spinner></ui-spinner>
        </div>
    `,
    styleUrls: ['./preload.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [style({ opacity: 1 }), animate(500, style({ opacity: 1 }))]),
            transition(':leave', [animate(500, style({ opacity: 0 }))])
        ])
    ]
})
export class PreloadComponent {
    appLoaded$: Observable<boolean> = this._preloadService.loaded$.pipe(map((loaded) => !loaded));

    constructor(private _preloadService: PreloadService) {}
}
