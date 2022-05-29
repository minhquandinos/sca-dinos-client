import { Directive, HostListener, Renderer2 } from '@angular/core';

import { UiTable2ScrollService } from '../services/ui-table2-scroll.service';

@Directive({
    selector: '[uiTable2Scroll]'
})
export class UiTable2ScrollDirective {
    @HostListener('scroll', ['$event'])
    scrolling(event: any) {
        this.scrollHandler(event);
    }

    constructor(private scrollService: UiTable2ScrollService, private renderer: Renderer2) {}

    private scrollHandler(event: Event): void {
        const scrollPosition = (event.target as Element).scrollLeft;
        this.scrollService.setScrollPosition(scrollPosition);
        this.renderer.setStyle(this.scrollService.tableContainer.nativeElement, 'left', scrollPosition === 0 ? 0 : `-${scrollPosition}px`);
    }
}
