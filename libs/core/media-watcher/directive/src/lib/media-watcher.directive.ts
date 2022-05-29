import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MediaWatcherService } from '@scaleo/core/media-watcher/service';

import { MediaWatcherDeviceEnum } from '../../../service/src/lib/media-watcher.model';

@Directive({
    selector: '[coreScaleoMediaWatcher]'
})
export abstract class MediaWatcherDirective implements OnInit, OnDestroy {
    protected unsubscribe: Subject<void> = new Subject();

    private node: unknown;

    protected constructor(
        protected mediaWatcherService: MediaWatcherService,
        protected templateRef: TemplateRef<any>,
        protected containerRef: ViewContainerRef,
        protected type: MediaWatcherDeviceEnum
    ) {}

    ngOnInit(): void {
        this.factory$.pipe(takeUntil(this.unsubscribe)).subscribe((v) => {
            if (v) {
                if (!this.node) {
                    const ref = this.containerRef.createEmbeddedView(this.templateRef);
                    this.node = ref.rootNodes;
                }
            } else {
                this.node = undefined;
                this.containerRef.clear();
            }
        });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    protected get factory$(): Observable<boolean> {
        switch (this.type) {
            case MediaWatcherDeviceEnum.Desktop:
                return this.mediaWatcherService.isDesktop$;
            case MediaWatcherDeviceEnum.Tablet:
                return this.mediaWatcherService.isTablet$;
            case MediaWatcherDeviceEnum.Mobile:
                return this.mediaWatcherService.isMobile$;
            case MediaWatcherDeviceEnum.NotMobile:
                return this.mediaWatcherService.isNotMobile$;
            default:
                return EMPTY;
        }
    }
}
