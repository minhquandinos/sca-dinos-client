import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

import { MediaWatcherService } from './media-watcher.service';

@NgModule({
    imports: [LayoutModule],
    providers: [MediaWatcherService]
})
export class MediaWatcherModule {}
