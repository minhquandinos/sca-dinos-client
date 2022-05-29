import { AfterViewInit, Component, ElementRef, HostBinding, Input, Renderer2, ViewChild } from '@angular/core';

import { UiPageWrapperHeaderSizeType } from '../types/ui-page-wrapper-header.type';

@Component({
    selector: 'ui-page-wrapper-header',
    template: `
        <div class="page-wrapper-header d-flex" [ngClass]="className" #headerRef>
            <ng-content></ng-content>
        </div>
    `
})
export class UiPageWrapperHeaderComponent implements AfterViewInit {
    @HostBinding('class') hostClass = 'ui-page-wrapper-header';

    @Input() sticky: boolean;

    @Input() haveBorderBottom = true;

    @Input() className: string;

    @Input() size: UiPageWrapperHeaderSizeType;

    @ViewChild('headerRef') headerRef: ElementRef;

    constructor(public readonly renderer: Renderer2) {}

    ngAfterViewInit(): void {
        if (this.sticky) {
            this.renderer.addClass(this.headerRef.nativeElement, 'sticky-top');
        }

        if (this.size) {
            const sizeClasses = {
                large: 'is-1',
                big: 'is-2',
                medium: 'is-3',
                small: 'is-4'
            };

            const sizeClass = sizeClasses[this.size];
            if (sizeClass) {
                this.renderer.addClass(this.headerRef.nativeElement, sizeClass);
            }
        }

        if (!this.haveBorderBottom) {
            this.renderer.addClass(this.headerRef.nativeElement, 'border-bottom-0');
        }
    }
}
