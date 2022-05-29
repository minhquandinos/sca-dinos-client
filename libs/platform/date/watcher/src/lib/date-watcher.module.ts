import { NgModule } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { DateUtil } from '@scaleo/platform/date/util';

import { DateWatcherService } from './date-watcher.service';

@NgModule({
    providers: [DateWatcherService]
})
export class DateWatcherModule {
    constructor(private dateWatcher: DateWatcherService) {
        this.watch();
    }

    private watch(): void {
        interval(1000 * 60)
            .pipe(
                switchMap(() => this.dateWatcher.now$),
                tap((date) => {
                    if (date !== DateUtil.now()) {
                        this.dateWatcher.setNowDate(DateUtil.now());
                    }
                })
            )
            .subscribe();
    }
}
