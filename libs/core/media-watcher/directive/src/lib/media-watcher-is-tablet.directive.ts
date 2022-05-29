import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { MediaWatcherService } from '@scaleo/core/media-watcher/service';

import { MediaWatcherDeviceEnum } from '../../../service/src/lib/media-watcher.model';
import { MediaWatcherDirective } from './media-watcher.directive';

@Directive({
    selector: '[coreScaleoIsTablet]'
})
export class MediaWatcherIsTabletDirective extends MediaWatcherDirective implements OnInit, OnDestroy {
    constructor(
        protected mediaWatcherService: MediaWatcherService,
        protected templateRef: TemplateRef<any>,
        protected containerRef: ViewContainerRef
    ) {
        super(mediaWatcherService, templateRef, containerRef, MediaWatcherDeviceEnum.Tablet);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
