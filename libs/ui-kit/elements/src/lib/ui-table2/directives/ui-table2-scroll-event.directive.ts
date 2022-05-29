import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject, Renderer2 } from '@angular/core';

import { UI_TABLE2_SCROLL_SPEED } from '../constants/ui-table2-scroll-speed';
import { UiTable2ParentContainerService } from '../services/ui-table2-parent-container.service';
import { UiTable2ScrollService } from '../services/ui-table2-scroll.service';

enum KeyCodeEnum {
    RightArrow = 'ArrowRight',
    LeftArrow = 'ArrowLeft'
}

@Directive({
    selector: '[uiTable2ScrollEvent]'
})
export class UiTable2ScrollEventDirective {
    private canScroll: boolean;

    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.key === KeyCodeEnum.RightArrow) {
            console.log('right');
            if (this.scrollService.scrollContainer.nativeElement.scrollLeft >= 0) {
                this.scrollHandler('right', UI_TABLE2_SCROLL_SPEED);
            }
        }

        if (event.key === KeyCodeEnum.LeftArrow) {
            if (this.scrollService.scrollContainer.nativeElement.scrollLeft > 0) {
                this.scrollHandler('left', UI_TABLE2_SCROLL_SPEED);
            }
        }
    }

    @HostListener('wheel', ['$event'])
    scrolling(event: WheelEvent) {
        if (event.deltaX > 0 && event.deltaY === 0 && this.canScroll) {
            this.scrollHandler('right', event.deltaX);
        }

        if (event.deltaX < 0 && event.deltaY === 0 && this.canScroll) {
            this.scrollHandler('left', event.deltaX);
        }
    }

    @HostListener('mouseover', ['$event'])
    mouseStartHandler() {
        this.canScroll = true;
        this.renderer.setStyle(this.document.body, 'overscroll-behavior-x', 'none');
    }

    @HostListener('mouseout', ['$event'])
    mouseEndHandler() {
        this.canScroll = false;
        this.renderer.removeStyle(this.document.body, 'overscroll-behavior-x');
    }

    @HostListener('panleft', ['$event'])
    panleft(event: any) {
        if (event.angle > 0) {
            this.scrollHandler('right');
        }
    }

    @HostListener('panright', ['$event'])
    panright(event: any) {
        if (event.angle >= -10 || event.angle >= 0) {
            this.scrollHandler('left');
        }
    }

    @HostListener('window:resize', ['$event'])
    hostResize() {
        // if (this.scrollService.enabled) {
        //     this.scrollService.setScrollWidth(this.scrollService.tableContainer.nativeElement.scrollWidth);
        // }
    }

    constructor(
        private scrollService: UiTable2ScrollService,
        private parentContainerService: UiTable2ParentContainerService,
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2
    ) {}

    private scrollHandler(direction: 'right' | 'left', deltaX?: number): void {
        const scrollSpeed = () => {
            return (Math.abs(deltaX) * UI_TABLE2_SCROLL_SPEED) / 240;
        };

        if (direction === 'left') {
            // this.scrollService.scrollContainer.nativeElement.scrollLeft -= UI_TABLE2_SCROLL_SPEED;
            if (deltaX) {
                this.scrollService.scrollContainer.nativeElement.scrollLeft -= scrollSpeed() + UI_TABLE2_SCROLL_SPEED;
            }
        }

        if (direction === 'right') {
            // this.scrollService.scrollContainer.nativeElement.scrollLeft += UI_TABLE2_SCROLL_SPEED;
            if (deltaX) {
                this.scrollService.scrollContainer.nativeElement.scrollLeft += scrollSpeed() + UI_TABLE2_SCROLL_SPEED;
            }
        }
    }
}
