import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { MediaWatcherService } from '@scaleo/core/media-watcher/service';

@Injectable()
export class PanelLayoutService {
    readonly isMobile$ = this.mediaWatcherService.isMatched$(['(max-width: 1079px)']);

    readonly isNotMobile$ = this.mediaWatcherService.isMatched$(['(min-width: 1079px)']);

    private _collapseMenu$ = new BehaviorSubject<boolean>(false);

    readonly collapseMenu$ = this._collapseMenu$.asObservable();

    private _mobileMenu$ = new BehaviorSubject<boolean>(false);

    readonly mobileMenu$ = this._mobileMenu$.asObservable();

    constructor(private readonly translate: TranslateService, private readonly mediaWatcherService: MediaWatcherService) {}

    collapseMenu(): void {
        this._collapseMenu$.next(!this._collapseMenu$.value);
    }

    setCollapseMenu(value: boolean): void {
        this._collapseMenu$.next(value);
    }

    setMobileMenu(value: boolean): void {
        this._mobileMenu$.next(value);
    }

    toggleMobileMenu(): void {
        this._mobileMenu$.next(!this._mobileMenu$.value);
    }
}
