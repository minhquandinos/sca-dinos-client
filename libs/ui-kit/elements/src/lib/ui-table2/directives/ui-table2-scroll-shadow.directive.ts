import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, shareReplay, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { UiTable2ScrollService } from '../services/ui-table2-scroll.service';

@Directive({
    selector: '[uiTable2ScrollShadow]',
    providers: [UnsubscribeService]
})
export class UiTable2ScrollShadowDirective implements AfterViewInit {
    @Input('uiTable2ScrollShadow') position: 'left' | 'right';

    constructor(
        private unsubscribe: UnsubscribeService,
        private scrollService: UiTable2ScrollService,
        private renderer: Renderer2,
        private readonly host: ElementRef
    ) {}

    public ngAfterViewInit(): void {
        combineLatest([this.scrollService.scrollWidth$, this.scrollService.scrollPosition$])
            .pipe(
                distinctUntilChanged(),
                tap(([scrollWidth, scrollPosition]) => {
                    if (scrollWidth > 0) {
                        if (scrollPosition === 0) {
                            this.leftShadow(false);
                        }

                        if (scrollPosition > 0) {
                            this.leftShadow(true);
                        }

                        const endScroll = this.scrollService.scrollContainerWith + scrollPosition >= scrollWidth;

                        if (scrollWidth >= this.scrollService.scrollContainerWith && !endScroll) {
                            this.rightShadow(true);
                        }

                        if (endScroll) {
                            this.rightShadow(false);
                        }
                    }
                }),
                shareReplay(),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    private shadow(show: boolean) {
        const visibilityClass = 'table2__scroll-shadow-visibility';

        if (show) {
            this.renderer.addClass(this.host.nativeElement, visibilityClass);
        } else {
            this.renderer.removeClass(this.host.nativeElement, visibilityClass);
        }
    }

    private leftShadow(show: boolean) {
        if (this.position === 'left') {
            this.shadow(show);
        }
    }

    private rightShadow(show: boolean) {
        if (this.position === 'right') {
            this.shadow(show);
        }
    }
}
