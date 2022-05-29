import { NgModule } from '@angular/core';

import { MediaWatcherModule } from '@scaleo/core/media-watcher/service';

import { MediaWatcherIsDesktopDirective } from './media-watcher-is-desktop.directive';
import { MediaWatcherIsMobileDirective } from './media-watcher-is-mobile.directive';
import { MediaWatcherIsNotMobileDirective } from './media-watcher-is-not-mobile.directive';
import { MediaWatcherIsTabletDirective } from './media-watcher-is-tablet.directive';

@NgModule({
    declarations: [
        MediaWatcherIsMobileDirective,
        MediaWatcherIsDesktopDirective,
        MediaWatcherIsNotMobileDirective,
        MediaWatcherIsTabletDirective
    ],
    imports: [MediaWatcherModule],
    exports: [
        MediaWatcherIsMobileDirective,
        MediaWatcherIsDesktopDirective,
        MediaWatcherIsNotMobileDirective,
        MediaWatcherIsTabletDirective
    ]
})
export class MediaWatcherDirectiveModule {}
