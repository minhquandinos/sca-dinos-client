import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { PageContentService } from '@scaleo/core/page-content/service';
import { ResizeObserverService } from '@scaleo/core/resize-observer/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

import { StickyType } from './types/sticky.type';

@Directive({
    selector: '[appSticky]',
    providers: [ResizeObserverService, UnsubscribeService]
})
export class StickyDirective implements OnInit {
    @Input('appSticky') type: StickyType = 'top';

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.sticky();
    }

    constructor(
        private pageContentService: PageContentService,
        private host: ElementRef,
        private renderer: Renderer2,
        private resizeObserverService: ResizeObserverService,
        private unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.resizeObserverService
            .observe(this.host.nativeElement)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                this.sticky();
            });
    }

    private sticky(): void {
        const map: { [key in StickyType]: string } = {
            top: 'stickyTop',
            bottomTop: 'stickyBottomTop',
            bottom: 'stickyBottom'
        };

        if (map[this.type]) {
            this[map[this.type as string]]();
        }
    }

    private stickyTop(): void {
        this.setStickyClass();
    }

    private stickyBottomTop(): void {
        const element = this.pageContentService.elementRef.nativeElement;
        this.setStickyClass();

        if (this.host.nativeElement.offsetHeight > element.offsetHeight) {
            this.renderer.setStyle(this.host.nativeElement, 'top', `${element.offsetHeight - this.host.nativeElement.offsetHeight}px`);
        } else {
            this.renderer.setStyle(this.host.nativeElement, 'top', `0px`);
        }
    }

    private stickyBottom(): void {
        const element = this.pageContentService.elementRef.nativeElement;
        this.setStickyClass();

        this.renderer.setStyle(this.host.nativeElement, 'top', `${element.offsetHeight - this.host.nativeElement.offsetHeight}px`);
    }

    private setStickyClass(): void {
        const typeMap = {
            top: 'sticky-top',
            bottom: 'position-sticky',
            bottomTop: 'position-sticky'
        };

        const className = typeMap[this.type];
        if (!this.host.nativeElement.classList.contains(className)) {
            this.renderer.addClass(this.host.nativeElement, className);
        }
    }
}
