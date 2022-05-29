import { Injectable, Optional } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, interval } from 'rxjs';

import { WindowRefService } from '@scaleo/core/window-ref/service';

@Injectable({
    providedIn: 'root'
})
export class VersionService {
    private _show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    readonly show$ = this._show$.asObservable();

    constructor(@Optional() private readonly sw: SwUpdate, private readonly window: WindowRefService) {
        this.checkVersion();
    }

    refresh(): void {
        this.window.nativeWindow.location.reload();
    }

    private checkVersion(): void {
        if (this.sw) {
            interval(1000 * 60).subscribe(() => {
                this.sw.checkForUpdate();
            });

            this.sw.versionUpdates.subscribe(() => {
                this.sw.activateUpdate().then(() => {
                    this._show$.next(true);
                });
            });
        }

        // this.sw.activated.subscribe((ev) => {
        //     console.log('Previous version: ', ev.previous);
        //     console.log('Current version: ', ev.current);
        // });
    }
}
